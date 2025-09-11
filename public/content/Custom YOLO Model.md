# Training YOLOv8 for Traffic Object Detection

A practical guide to training YOLOv8 models on driving data for detecting cars, pedestrians, and traffic signs using a subset of the BDD100K dataset.

<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/yolo/sample.png" width="80%" alt="sample" />

## What This Project Does

Takes the BDD100K dataset (a large collection of driving videos and images) and trains a YOLOv8 model to detect common traffic objects. The goal is to build a model that can identify cars, pedestrians, traffic signs, and other obstacles in real-time driving scenarios.

**What Gets Detected:**

- Cars and vehicles
- Pedestrians
- Traffic signs
- Other road obstacles

## Why BDD100K Dataset?

BDD100K is one of the biggest datasets for autonomous driving research. It has 100,000 driving videos with annotations, but we're using a smaller subset of 3,458 images for this training.

<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/yolo/data.png" width="80%" alt="data" />

**Why it's useful:**

- Real driving conditions (highways, city streets, rural roads)
- Different weather and lighting situations
- Good quality bounding box annotations
- Covers the objects we actually need to detect while driving

## Data Processing Pipeline

The original BDD100K labels come in JSON format, but YOLO needs TXT files. Here's how we convert them:

<img src="https://raw.githubusercontent.com/vrobbin3247/hosted-media/main/yolo/data-pipeline.png" width="80%" alt="data pipeline" style="background-color: #ffffff;" />

### Step 1: JSON to XML

First convert the original JSON annotations to XML format for easier processing.

### Step 2: XML to TXT

Then convert XML to YOLO's required TXT format.

**Sample YOLO label file:**

```
0 0.490234375 0.32916666666666666 0.012109375 0.022222222222222223
0 0.703515625 0.31527777777777777 0.044140625 0.04027777777777778
8 0.724609375 0.20416666666666666 0.019921875 0.043055555555555555
```

Each line represents one detected object:

- First number: class ID (0 = car, 8 = traffic sign)
- Next four numbers: bounding box coordinates (center_x, center_y, width, height)
- All coordinates are normalized to image size

## Training Setup

Pretty straightforward YOLO training:

```python
model = YOLO('yolov8n.pt')  # Start with nano model
results = model.train(
    data='mydata.yml',      # Config file with paths and classes
    imgsz=640,              # Image size
    epochs=10,              # Training rounds
    batch=32,               # Batch size
    name='yolov8n_custom'   # Output folder name
)
```

**Training Parameters:**

- **Image size:** 640x640 pixels
- **Epochs:** 10 (kept low for this demo)
- **Batch size:** 32
- **Base model:** YOLOv8 nano (smallest, fastest version)

## Model Comparison Results

Trained three different YOLOv8 variants to see the trade-offs:

| Metric         | YOLOv8n (Nano) | YOLOv8s (Small) | YOLOv8m (Medium) |
| -------------- | -------------- | --------------- | ---------------- |
| **Precision**  | 0.225          | 0.33            | 0.553            |
| **Recall**     | 0.198          | 0.24            | 0.298            |
| **mAP50**      | 0.185          | 0.23            | 0.302            |
| **Val Loss**   | 4.1            | 3.6             | 2.4              |
| **Model Size** | ~7 MB          | ~35 MB          | ~83 MB           |
| **Speed**      | ~3.8 ms/img    | ~6.5 ms/img     | ~8.2 ms/img      |

**What this means:**

- **YOLOv8m:** Best accuracy but largest and slowest
- **YOLOv8n:** Fastest and smallest but lowest accuracy
- **YOLOv8s:** Middle ground between speed and accuracy

For real-time applications, YOLOv8n might be better despite lower accuracy. For applications where accuracy matters more than speed, go with YOLOv8m.

## Training Process

### Data Configuration

Create a `mydata.yml` file:

```yaml
train: path/to/train/images
val: path/to/val/images
nc: 10 # number of classes
names:
  [
    "car",
    "truck",
    "bus",
    "person",
    "bike",
    "motorcycle",
    "traffic_light",
    "traffic_sign",
    "train",
    "rider",
  ]
```

### Label Conversion Code

The conversion from JSON to YOLO format handles:

- Normalizing bounding box coordinates to image dimensions
- Converting class names to numerical IDs
- Ensuring proper formatting for YOLO training

### Training Output

YOLO automatically creates:

- Training curves showing loss over time
- Validation images with predicted bounding boxes
- Model weights file (.pt format)
- Performance metrics and confusion matrices

## Results

The trained model can detect multiple objects in a single image with bounding boxes and confidence scores. Validation images show the model successfully identifying:

- Multiple cars in traffic
- Pedestrians on sidewalks and crossings
- Traffic signs at various distances
- Other vehicles like trucks and buses

**Performance Notes:**

- Works well on clear, well-lit images
- Struggles a bit with small or distant objects
- Better performance with higher resolution models (YOLOv8s/m)
- Could benefit from more training epochs for better accuracy

## Implementation Details

### Requirements

```python
ultralytics  # YOLOv8 implementation
opencv-python
pillow
numpy
matplotlib
```

### Running Training

```bash
# Install ultralytics
pip install ultralytics

# Train the model
python train_yolo.py
```

### Inference

```python
from ultralytics import YOLO

model = YOLO('runs/detect/yolov8n_custom/weights/best.pt')
results = model('path/to/test/image.jpg')
results[0].show()  # Display results
```
