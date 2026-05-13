from flask import Flask, jsonify, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO
import threading
import time
import cv2
import torch
import numpy as np
import psutil

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# ─── Shared State ─────────────────────────────────────────
state = {
    "fps": 0,
    "confidence": 0,
    "detections": [],
    "status": "SCANNING",
    "mode": "feed_only"
}
frame_lock = threading.Lock()
latest_frame = None

# ─── Detection Thread ──────────────────────────────────────
def detection_loop():
    global latest_frame, state

    from ultralytics import YOLO
    yolo_model = YOLO("../runs/detect/train/weights/best.pt")

    model_type = "MiDaS_small"
    midas = torch.hub.load("intel-isl/MiDaS", model_type)
    midas.eval()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    midas.to(device)
    transform = torch.hub.load("intel-isl/MiDaS", "transforms").small_transform

    cap = cv2.VideoCapture(0)
    prev_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame_h, frame_w = frame.shape[:2]
        current_time = time.time()
        fps = 1 / (current_time - prev_time)
        prev_time = current_time

        results = yolo_model(frame)
        annotated_frame = frame.copy()

        # MiDaS depth
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        with torch.no_grad():
            prediction = midas(transform(img_rgb).to(device))
            prediction = torch.nn.functional.interpolate(
                prediction.unsqueeze(1),
                size=img_rgb.shape[:2],
                mode="bicubic",
                align_corners=False,
            ).squeeze()
        depth_visual = cv2.normalize(
            prediction.cpu().numpy(), None, 0, 255, cv2.NORM_MINMAX
        ).astype(np.uint8)

        detections = []
        for result in results:
            for box in result.boxes:
                cls = int(box.cls[0])
                conf = float(box.conf[0])
                label = yolo_model.names[cls]

                if label.lower() != "drone" or conf < 0.4:
                    continue

                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                depth_value = depth_visual[cy, cx]

                detection = {
                    "label": label,
                    "confidence": round(conf * 100, 1),
                    "x": round((cx / frame_w) * 10, 2),
                    "y": round(((frame_h - cy) / frame_h) * 10, 2),
                    "z": round(((255 - depth_value) / 255) * 10, 2),
                }
                detections.append(detection)

                # Draw on frame
                cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(annotated_frame, f"{label} {conf:.2f}",
                            (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.circle(annotated_frame, (cx, cy), 5, (0, 0, 255), -1)

                # Push live event to frontend
                socketio.emit("event", {
                    "message": f"Drone detected — Conf: {conf:.1%} | Z: {detection['z']}m",
                    "timestamp": time.strftime("%H:%M:%S"),
                    "type": "detection"
                })

        cv2.putText(annotated_frame, f"FPS: {fps:.1f}",
                    (20, 45), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        state.update({
            "fps": round(fps, 1),
            "confidence": detections[0]["confidence"] if detections else 0,
            "detections": detections,
            "status": "ACTIVE" if detections else "SCANNING",
        })

        with frame_lock:
            _, buffer = cv2.imencode(".jpg", annotated_frame)
            latest_frame = buffer.tobytes()


# ─── MJPEG Stream ──────────────────────────────────────────
def generate_frames():
    while True:
        with frame_lock:
            if latest_frame is None:
                time.sleep(0.033)
                continue
            frame = latest_frame
        yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")
        time.sleep(0.033)

@app.route("/video_feed")
def video_feed():
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")


# ─── API Routes ────────────────────────────────────────────
@app.route("/api/telemetry")
def telemetry():
    return jsonify({
        "fps": state["fps"],
        "cpu_load": round(psutil.cpu_percent()),
        "ram_usage": round(psutil.virtual_memory().percent),
        "status": state["status"],
    })

@app.route("/api/detection")
def detection():
    return jsonify({
        "confidence": state["confidence"],
        "detections": state["detections"],
        "model": "YOLOv8-TRK",
        "status": state["status"],
    })

@app.route("/api/mode", methods=["POST"])
def set_mode():
    state["mode"] = request.json.get("mode", "feed_only")
    return jsonify({"success": True, "mode": state["mode"]})


# ─── Start ─────────────────────────────────────────────────
if __name__ == "__main__":
    threading.Thread(target=detection_loop, daemon=True).start()
    socketio.run(app, port=5000)