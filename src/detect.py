import cv2
from ultralytics import YOLO
import time

# Load YOLO model
model = YOLO("yolov8n.pt")

# Start webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Cannot open webcam")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLO detection
    results = model(frame)

    for r in results:
        boxes = r.boxes

        for box in boxes:
            # Bounding box
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Center point
            cx = int((x1 + x2) / 2)
            cy = int((y1 + y2) / 2)

            # Draw rectangle
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Draw center dot
            cv2.circle(frame, (cx, cy), 5, (0, 0, 255), -1)

            # Show coordinates
            cv2.putText(frame, f"X:{cx} Y:{cy}", (cx, cy - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Display
    cv2.imshow("YOLO Detection", frame)

    # 🔴 Exit with ESC key (27)
    if cv2.waitKey(1) & 0xFF == 27:
        break

    # 🐢 Small delay (adjust if needed)
    time.sleep(0.03)   # ~30 ms delay (~30 FPS cap)

cap.release()
cv2.destroyAllWindows()