from app import db

class DetectionHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(100), nullable=False)
    explanation = db.Column(db.String(500), nullable=False)
    feedback = db.Column(db.String(500))
    image = db.Column(db.LargeBinary, nullable=False)  # Use LargeBinary for blob data
