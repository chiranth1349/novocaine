from ultralytics import YOLO

model = YOLO("yolov8n.pt")

model.train(
    data="D:/Projects/Novocaine/training/data.yaml",
    epochs=30,
    imgsz=640
)