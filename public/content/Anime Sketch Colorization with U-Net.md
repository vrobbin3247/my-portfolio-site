# Anime Sketch Colorization with U-Net: Deep Learning Meets Interactive Art

An intelligent colorization system that transforms grayscale anime sketches into vibrant artwork using U-Net architecture, combining user creativity with AI precision through interactive color scribbling.

| Input Sketch                                                                                                                 | Color Scribbles                                                                                                                     | Ground Truth                                                                                                                           | Model Output                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![Sketch 1](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/naruto_edge.jpg) | ![Scribbles 1](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/naruto_scribble.jpg) | ![Ground Truth 1](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/naruto_original.jpg) | ![Output 1](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/naruto_generated.jpg) |
| ![Sketch 2](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/maomao_edge.jpg) | ![Scribbles 2](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/maomao_scribble.jpg) | ![Ground Truth 2](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/maomao_original.jpg) | ![Output 2](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/maomao_output.jpg)    |
| ![Sketch 3](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/uzui_edge.jpg)   | ![Scribbles 3](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/uzui_scribble.jpg)   | ![Ground Truth 3](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/uzui_original.jpg)   | ![Output 3](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/main/images/uzui_output.jpg)      |

## Project Overview

This deep learning project creates a complete pipeline for anime sketch colorization, featuring a custom U-Net architecture that accepts both grayscale sketches and user-provided color hints to generate fully colored anime characters. The system integrates edge detection, interactive canvas drawing, and neural network inference into a seamless web application.

**Key Features:**

- 4-channel input processing (1 grayscale + 3 RGB channels)
- Interactive web-based color hinting interface
- Real-time edge detection with adjustable parameters
- 95.7% loss reduction over 57 training epochs
- End-to-end colorization pipeline from sketch to final artwork

## Technical Architecture

### U-Net Model Implementation

The core architecture uses a modified U-Net with skip connections optimized for colorization tasks:

```python
class UNet(nn.Module):
    def __init__(self, in_channels=4, out_channels=3):
        super(UNet, self).__init__()

        def conv_block(in_ch, out_ch):
            return nn.Sequential(
                nn.Conv2d(in_ch, out_ch, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.Conv2d(out_ch, out_ch, kernel_size=3, padding=1),
                nn.ReLU(inplace=True)
            )

        self.encoder1 = conv_block(in_channels, 64)
        self.encoder2 = conv_block(64, 128)
        self.encoder3 = conv_block(128, 256)
        self.encoder4 = conv_block(256, 512)
        self.pool = nn.MaxPool2d(2)

        self.bottleneck = conv_block(512, 1024)

        self.upconv4 = nn.ConvTranspose2d(1024, 512, kernel_size=2, stride=2)
        self.decoder4 = conv_block(1024, 512)

        self.upconv3 = nn.ConvTranspose2d(512, 256, kernel_size=2, stride=2)
        self.decoder3 = conv_block(512, 256)

        self.upconv2 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.decoder2 = conv_block(256, 128)

        self.upconv1 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.decoder1 = conv_block(128, 64)

        self.final_conv = nn.Conv2d(64, out_channels, kernel_size=1)

    def forward(self, x):
        e1 = self.encoder1(x)
        e2 = self.encoder2(self.pool(e1))
        e3 = self.encoder3(self.pool(e2))
        e4 = self.encoder4(self.pool(e3))

        b = self.bottleneck(self.pool(e4))

        d4 = self.upconv4(b)
        d4 = self.decoder4(torch.cat([d4, e4], dim=1))

        d3 = self.upconv3(d4)
        d3 = self.decoder3(torch.cat([d3, e3], dim=1))

        d2 = self.upconv2(d3)
        d2 = self.decoder2(torch.cat([d2, e2], dim=1))

        d1 = self.upconv1(d2)
        d1 = self.decoder1(torch.cat([d1, e1], dim=1))

        return torch.tanh(self.final_conv(d1))
```

**Architecture Specifications:**

- **Input Resolution**: 160×256 pixels
- **Channel Configuration**: 4-channel input → 3-channel RGB output
- **Parameters**: ~31M trainable parameters
- **Memory Usage**: ~4GB GPU memory (batch size 16)
- **Skip Connections**: Preserve fine details at multiple scales

### Edge Detection System

The preprocessing pipeline implements Sobel edge detection with interactive parameter tuning:

```python
def apply_sobel(image_data, kernel_size=3):
    """Apply Sobel edge detection with noise reduction"""
    image_array = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    # Convert to grayscale for edge detection
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Sobel operators in both directions
    sobel_x = cv2.Sobel(gray_image, cv2.CV_64F, 1, 0, ksize=kernel_size)
    sobel_y = cv2.Sobel(gray_image, cv2.CV_64F, 0, 1, ksize=kernel_size)

    # Combine gradients and normalize
    sobel_combined = np.sqrt(sobel_x ** 2 + sobel_y ** 2)
    sobel_normalized = np.uint8(255 * sobel_combined / np.max(sobel_combined))

    # Invert for sketch-like appearance
    return image, cv2.bitwise_not(sobel_normalized)
```

## Training Pipeline and Results

### Dataset and Preprocessing

**Source**: [anime_diffusion_full dataset](https://huggingface.co/datasets/pawlo2013/anime_diffusion_full)

- **Size**: 20,000 high-quality anime images
- **Resolution**: Standardized to 160×256 pixels
- **Components**: Original images, sketches, color scribbles, merged inputs

### Training Performance

The model demonstrated exceptional learning capability across 57 epochs:

- **Initial Loss**: 0.1946 (Epoch 1)
- **Final Loss**: 0.0084 (Epoch 57)
- **Loss Reduction**: 95.7% improvement
- **Training Time**: ~8 hours on TPU
- **Optimizer**: Adam with learning rate 1e-4
- **Loss Function**: Mean Squared Error (MSE)

![loss](https://raw.githubusercontent.com/vrobbin3247/UAN-based-anime-style-image-coloriser/refs/heads/main/images/training_loss_plot.png)

**Training Characteristics:**

- Rapid initial convergence (50% loss reduction in first 10 epochs)
- Stable training without overfitting indicators
- Consistent improvement throughout all epochs
- Final loss indicates excellent reconstruction quality

## Model Integration and Inference

### Streamlit Web Application

The complete system integrates into a responsive web interface:

```python
class ColorizationModel:
    def __init__(self, model_path, device=None):
        self.device = device or ('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = UNet(in_channels=4, out_channels=3)
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model.to(self.device)
        self.model.eval()

    def predict(self, sketch, scribble):
        """Generate colorized output from sketch and scribble inputs"""
        input_tensor = self.prepare_input(sketch, scribble)

        with torch.no_grad():
            output = self.model(input_tensor)

        # Post-process output to valid image range
        output = output.squeeze(0)
        output = torch.clamp(output * 0.5 + 0.5, 0, 1)

        # Convert to PIL Image
        np_img = output.cpu().numpy().transpose(1, 2, 0)
        return Image.fromarray((np_img * 255).astype(np.uint8))
```

### Real-time Processing Pipeline

The application handles the complete workflow:

1. **Image Input**: URL-based image loading with validation
2. **Edge Detection**: Adjustable Sobel filtering for sketch generation
3. **Interactive Drawing**: HTML5 canvas with brush size control
4. **Data Export**: Canvas-to-image conversion for model input
5. **AI Inference**: Real-time colorization using trained U-Net
6. **Result Display**: Side-by-side comparison with download options

## Technology Stack

**Deep Learning Framework:**

- **PyTorch**: Model architecture and training
- **Torchvision**: Image transformations and preprocessing

**Web Application:**

- **Streamlit**: Interactive web interface
- **HTML5 Canvas**: Real-time drawing functionality
- **JavaScript**: Client-side interaction handling

**Image Processing:**

- **OpenCV**: Edge detection and image manipulation
- **Pillow (PIL)**: Image format handling and conversion
- **NumPy**: Numerical operations and array processing

**Data Handling:**

- **HuggingFace Datasets**: Training data management
- **Base64 Encoding**: Canvas-to-server data transfer

---

_Built with PyTorch and Streamlit to democratize AI-powered art creation, making professional-quality colorization accessible to artists of all skill levels._
