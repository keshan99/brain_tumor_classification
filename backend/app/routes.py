from flask import request, jsonify, Blueprint
from app import db
import base64
from app.models import DetectionHistory

api_bp = Blueprint('api', __name__)

# Get all detection history items
@api_bp.route('/detections', methods=['GET'])  # Updated route URL
def get_detections():
    detections = DetectionHistory.query.all()
    result = [
        {
            "id": detection.id,
            "label": detection.label,
            "explanation": detection.explanation,
            "feedback": detection.feedback,
            "image": image_to_base64(detection.image) if detection.image else None
        }
        for detection in detections
    ]
    return jsonify(result)

# Save new detection item
@api_bp.route('/detections', methods=['POST'])  # Updated route URL
def create_detection():
    data = request.json
    new_detection = DetectionHistory(
        label=data['label'],
        explanation=data['explanation'],
        feedback=data.get('feedback'),
        images=data['images'].encode(),  # Assuming you encode the blob data
    )
    db.session.add(new_detection)
    db.session.commit()
    return jsonify({"message": "Detection created successfully"})

# Get one detection history item
@api_bp.route('/detections/<int:id>', methods=['GET'])  # Updated route URL
def get_detection(id):
    detection = DetectionHistory.query.get(id)
    if detection is None:
        return jsonify({"message": "Detection not found"}), 404
    return jsonify({
        "id": detection.id,
        "label": detection.label,
        "explanation": detection.explanation,
        "feedback": detection.feedback,
        "image": image_to_base64(detection.image) if detection.image else None
    })

# Update one detection history item
@api_bp.route('/detections/<int:id>', methods=['PUT'])  # Updated route URL
def update_detection(id):
    detection = DetectionHistory.query.get(id)
    if detection is None:
        return jsonify({"message": "Detection not found"}), 404

    data = request.json
    detection.label = data['label']
    detection.explanation = data['explanation']
    detection.feedback = data.get('feedback')
    detection.images = data['images'].encode()  # Assuming you encode the blob data
    db.session.commit()
    return jsonify({"message": "Detection updated successfully"})

def image_to_base64(image):
    if image:
        encoded_image = base64.b64encode(image).decode('utf-8')
        return encoded_image
    return None