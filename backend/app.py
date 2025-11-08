# app.py (Flask Backend)

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS # Keep this import
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
# NOTE: Removed the extra 'from flask_cors import CORS' line

# --- 1. Initialization ---
app = Flask(__name__)
# Crucial: Allows React (port 3000) to talk to Flask (port 5000)
CORS(app) # Keep this one CORS initialization

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# JWT Key - MUST BE KEPT SECRET
app.config['JWT_SECRET_KEY'] = 'your_super_secret_flask_key_12345'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# --- 2. Database Model ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)


# Create the database tables if they don't exist
with app.app_context():
    db.create_all()


# --- 3. API Endpoints ---

@app.route('/api/signup', methods=['POST'])
def signup():
    """Handles new user registration."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Signup failed. Email may already be in use."}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password_hash=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()

        # Token creation is optional on signup, but useful for auto-login
        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            "message": "User created successfully",
            "token": access_token  # Frontend ignores this if it redirects to login
        }), 201
    except Exception:
        db.session.rollback()
        return jsonify({"error": "An internal server error occurred."}), 500


@app.route('/api/login', methods=['POST'])
def login():
    """Handles user login."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        # Generate JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "message": "Login successful",
            "token": access_token
        })
    else:
        return jsonify({"error": "Invalid login credentials"}), 401


@app.route('/api/verify', methods=['GET'])
@jwt_required()
def verify():
    """Checks if the provided JWT token in the header is valid."""
    # If this point is reached, the token is valid
    return jsonify({"isValid": True}), 200


if __name__ == '__main__':
    # Flask runs on port 5000
    app.run(debug=True, port=5000)