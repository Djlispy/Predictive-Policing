import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Load the trained model
model = load_model('docs/mnist_model.h5')

# Assuming 'input_image_path' is the path to your input image
input_image_path = '/Users/a4/Desktop/Robotics Projects/Quarter 3 - Police/Predictive Policing Website/docs/test_5.png'

# Load and preprocess the input image
img = image.load_img(input_image_path, target_size=(28, 28), color_mode='grayscale')
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.0  # Normalize the pixel values

# Make predictions
predictions = model.predict(img_array)

# Get the predicted digit
predicted_digit = np.argmax(predictions[0])
print(f'The model predicts the digit: {predicted_digit}')
