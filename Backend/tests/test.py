from ultralytics import YOLO
import cv2

model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)

    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = box.xyxy[0]

            # Convert to int
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            # Center point
            cx = (x1 + x2) // 2
            cy = (y1 + y2) // 2

            # Print in terminal
            print("X:", cx, "Y:", cy)

            # Draw center point
            cv2.circle(frame, (cx, cy), 5, (0, 0, 255), -1)

            # Show coordinates on screen
            cv2.putText(frame, f"X:{cx} Y:{cy}", (cx, cy - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow("YOLO Detection", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()