# /backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from auth import require_auth
import translation_engine # Import Abdelrahman's file

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
# Enable CORS to allow your React app to make requests
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# --- PUBLIC ENDPOINT (for testing) ---
@app.route("/api/public")
def public():
    return jsonify(message="Hello from a public endpoint! No login required.")

# --- PROTECTED ENDPOINT (for testing) ---
# This requires a valid Auth0 token from Adams
@app.route("/api/private")
@require_auth(None)
def private():
    return jsonify(message="Hello from a private endpoint! You are logged in.")

# --- UPLOAD ENDPOINT (Placeholder) ---
# We will build this in the next step
@app.route("/api/upload", methods=["POST"])
@require_auth(None)
def upload_file():
    # TODO: Get file/text from request
    # TODO: Send text to translation_engine.simplify_medical_text()
    # TODO: Return the JSON

    # For now, return a placeholder
    placeholder_response = {
        "simplified_terms": [
            {"term": "Placeholder Term", "meaning": "This is a placeholder.", "why_it_matters": "The real AI is not connected yet."}
        ]
    }
    return jsonify(placeholder_response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)