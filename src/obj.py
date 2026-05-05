import cv2
from ultralytics import YOLO
import time

# Load model
model = YOLO("yolov8n.pt")

# Open webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Cannot open webcam")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Run detection
    results = model(frame)

    for r in results:
        boxes = r.boxes
        names = model.names

        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Class + confidence
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            label = f"{names[cls_id]} {conf:.2f}"

            # Draw box
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Label background
            (w, h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
            cv2.rectangle(frame, (x1, y1 - h - 10), (x1 + w, y1), (0, 255, 0), -1)

            # Put text
            cv2.putText(frame, label, (x1, y1 - 5),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

    # Show output
    cv2.imshow("Object Detection - Demo", frame)

    # ESC to exit
    if cv2.waitKey(1) & 0xFF == 27:
        break

    # Small delay
    time.sleep(0.03)

cap.release()
cv2.destroyAllWindows()