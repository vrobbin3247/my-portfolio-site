# Devanagari Handwritten Character Recognition using CNN

In a world increasingly driven by digital convenience, the ability to effortlessly bridge the gap between handwritten text and digital information is more crucial than ever. While systems for Latin script recognition are ubiquitous, the rich and complex Devanagari script, used for languages like Hindi, Marathi, and Nepali, presents its own unique challenges and opportunities. Today, we’re diving into an exciting project that tackles this head-on: a Streamlit-powered web application that accurately recognizes handwritten Devanagari characters using the power of Convolutional Neural Networks (CNNs).
![Inference Workflow](public/content/output.gif)

## The Challenge of Devanagari

Devanagari is known for its intricate characters, including a wide array of consonants, vowels, and conjunct characters (combinations of consonants). This complexity makes handwritten recognition a fascinating challenge for machine learning engineers. This project aims to recognize 46 distinct Devanagari characters, encompassing 36 consonants and conjuncts, and 10 numerical digits (०-९).

![Devanagari Characters](https://cdn-images-1.medium.com/max/1600/1*DL_tAiXcqSnvUXsK4Q22Tg.png)

## The Brain Behind the Operation: A Convolutional Neural Network

At the heart of this recognition system lies a robust Convolutional Neural Network (CNN). CNNs are particularly well-suited for image-based tasks like character recognition due to their ability to automatically learn hierarchical features from raw pixel data.

```python
model = Sequential([
    Input(shape=(32, 32, 1)),
    Conv2D(32, kernel_size=(3, 3), activation="relu"),
    BatchNormalization(),
    Conv2D(32, kernel_size=(3, 3), activation="relu"),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2, 2)),

    Conv2D(64, kernel_size=(3, 3), activation="relu"),
    BatchNormalization(),
    Conv2D(64, kernel_size=(3, 3), activation="relu"),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2, 2)),

    Flatten(),
    Dropout(0.5),
    Dense(num_classes, activation="softmax")
])
```

## Dataset

High-performing deep learning models are built on high-quality data. For this project, we leveraged the [Devanagari Handwritten Character Dataset](https://archive.ics.uci.edu/dataset/389/devanagari+handwritten+character+dataset) from the UCI Machine Learning Repository. This extensive dataset comprises **92,000 images** distributed across 46 classes, with each image standardized to a 32x32 pixel resolution in `.png` format. This ample and well-structured dataset was crucial for training a robust model.

## Results

The model demonstrates excellent recognition capabilities, with some characters achieving near-perfect F1-scores between 0.97 and 0.99. Notably, characters like ‘फ’, ‘ङ’, ‘४’, ‘५’, and ‘६’ are recognized with exceptional accuracy. The overall accuracy of 91% and a macro-average precision and recall of 0.91 underscore the model’s consistent performance across all character classes.

![Output 1](https://cdn-images-1.medium.com/max/1600/1*zl2fR-y1JA4hP8WSlhVn-g.png)

![Output 2](https://cdn-images-1.medium.com/max/1600/1*gn-uV0XdQnG5PUSoWdGrOQ.png)

## Inference using Streamlit

The true utility of a machine learning model lies in its application. For this project, we deployed our trained CNN model using **Streamlit**, creating an intuitive and interactive web application. The process from a user’s drawing to a prediction is a seamless workflow handled by a few key components.

### From Canvas to Prediction: A Step-by-Step Breakdown

1. **Drawing on the Canvas:**
   The user draws a Devanagari character on a black canvas provided by `streamlit_drawable_canvas`. This tool captures the user's drawing as raw image data.

```python
# canvas parameters
canvas_result = st_canvas(
      stroke_width=30,
      stroke_color="#ffffff",
      background_color="#000000",
      height=320,
      width=320,
      drawing_mode="freedraw",
      key="canvas",
      display_toolbar=True
  )
```

2. **Preprocessing the Image:**
   Before the image can be fed to our model, it must be transformed into the same format the model was trained on. This is handled by the `preprocess()` function. The raw image data is converted to grayscale, resized to the required **32x32 pixels**, and normalized to a range of 0 to 1. This ensures that the model receives consistent input, which is crucial for accurate predictions.

```python
def preprocess():
    if canvas_result.image_data is None:
        st.warning("Please draw a character first!")
        return

    image_data = canvas_result.image_data
    gray_image = cv2.cvtColor(image_data, cv2.COLOR_RGBA2GRAY)

    img = cv2.resize(gray_image, (32, 32))
    img = img / 255.0

    img = np.expand_dims(img, axis=(0, -1))
    return img
```

3. **Loading the Model:**
   To avoid repeatedly loading the model, which can be time-consuming, we use Streamlit’s `@st.cache_resource` decorator. This ensures the model is loaded only once when the application starts, making subsequent predictions much faster.

```python
@st.cache_resource
def load_model():
    return tf.keras.models.load_model("classifier86v3.keras")
```

4. **Making a Prediction:**
   When the “Predict” button is clicked, the preprocessed image is passed to the `predict_character()` function. This function calls the loaded TensorFlow model's `predict()` method, which outputs a probability distribution across all 46 character classes. The function then uses `np.argmax()` to find the class with the highest probability, which is our final prediction.

```python
def predict_character(img):
    model = load_model()
    predictions = model.predict(img)
    predicted_class = np.argmax(predictions)
    predicted_label = class_labels[predicted_class]
    return predicted_label
```

5. **Displaying the Result:**
   The predicted character is then displayed back to the user, providing an immediate and satisfying result. The application also includes a brief loading animation to enhance the user experience.

This streamlined inference pipeline, powered by Streamlit and TensorFlow, allows anyone to interact with a complex deep learning model and see its power in action without needing to write a single line of code. It’s a perfect example of how a well-trained model and a user-friendly interface can make powerful technology accessible to everyone.
