import os
from flask import request, jsonify, Blueprint
from app import db
import base64
from io import BytesIO
from app.models import DetectionHistory

import cv2
import tensorflow as tf
import numpy as np
import joblib

categories = ["category1_tumor", "category2_tumor", "category3_tumor", "no_tumor"]
print(os.getcwd())
model = tf.keras.models.load_model("app/classifier_new.h5")


api_bp = Blueprint("api", __name__)


@api_bp.route("/clear", methods=["GET"])
def clear():
    DetectionHistory.query.delete()
    db.session.commit()
    return jsonify({"message": "Detection history cleared"})


# Get all detection history items
@api_bp.route("/detections", methods=["GET"])  # Updated route URL
def get_detections():
    detections = DetectionHistory.query.all()
    result = [
        {
            "id": detection.id,
            "label": detection.label,
            "feedback": detection.feedback,
            "image": image_to_base64(detection.image) if detection.image else None,
        }
        for detection in detections
    ]

    return jsonify(result)


# Save new detection item
@api_bp.route("/detections", methods=["POST"])
def create_detection():
    # Get the image file from the request
    image_file = request.files.get(
        "image"
    )  # Assuming the file input in HTML form has the name 'image'

    if not image_file:
        return jsonify({"message": "No image provided"}), 400

    # # Read the image using OpenCV directly from BytesIO
    image_data = image_file.read()
    image_stream = BytesIO(image_data)
    image_stream.seek(0)  # Reset the stream position
    new_img = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)

    if new_img is None:
        return jsonify({"message": "Error reading image"}), 500

    # # Perform prediction using your get_prediction function
    prediction = get_prediction(new_img)

    # # Create a new DetectionHistory instance
    new_detection = DetectionHistory(
        label=prediction, image=image_data  # Store the image binary data
    )

    # # Assuming you're using a database session named db
    db.session.add(new_detection)
    db.session.commit()
    new_entry_id = new_detection.id

    return jsonify({"label": prediction, "id": new_entry_id}), 201


# Get one detection history item
@api_bp.route("/detections/<int:id>", methods=["GET"])  # Updated route URL
def get_detection(id):
    detection = DetectionHistory.query.get(id)
    if detection is None:
        return jsonify({"message": "Detection not found"}), 404
    return jsonify(
        {
            "id": detection.id,
            "label": detection.label,
            "feedback": detection.feedback,
            "image": image_to_base64(detection.image) if detection.image else None,
        }
    )


# Update one detection history item
@api_bp.route("/detections/<int:id>", methods=["PUT"])
def update_detection(id):
    detection = DetectionHistory.query.get(id)
    if detection is None:
        return jsonify({"message": "Detection not found"}), 404

    data = request.json
    detection.feedback = data.get("feedback")
    db.session.commit()
    return jsonify({"message": "Detection updated successfully"})


def image_to_base64(image):
    if image:
        encoded_image = base64.b64encode(image).decode("utf-8")
        return encoded_image
    return None


img_shape = 150
categories = ["category1_tumor", "category2_tumor", "category3_tumor", "no_tumor"]
scaler = joblib.load("app/scaler.pkl")


def get_prediction(new_img):
    data = []
    new_img = cv2.resize(new_img, (img_shape, img_shape))

    data.append(new_img.flatten())

    scaled_data = scaler.transform(np.array(data))

    reshaped_img = scaled_data.reshape(1, img_shape, img_shape, 3)

    type_changed_img = reshaped_img.astype("float32") / 255.0

    response = model.predict(type_changed_img)

    predicted_class = categories[np.argmax(response)]
    return predicted_class
