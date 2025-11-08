# /backend/app.py - (Complete File)
import io
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import PyPDF2

# Import our custom auth and AI modules
from auth import require_auth
import translation_engine

# Load environment variables from .env file
load_dotenv()

# --- App Initialization ---
app = Flask(__name__)

# Enable CORS to allow your React app (from http://localhost:3000) to make requests
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


# --- API Endpoints ---

@app.route("/api/public")
def public():
    """A public endpoint that anyone can access."""
    return jsonify(message="Hello from a public endpoint! No login required.")


@app.route("/api/private")
@require_auth(None)  # This decorator protects the route
def private():
    """A private endpoint that requires a valid Auth0 token."""
    return jsonify(message="Hello from a private endpoint! You are logged in.")


@app.route("/api/upload", methods=["POST"])
@require_auth(None)  # This decorator protects the route
def upload_file():
    """
    The main endpoint to handle file/text uploads.
    It extracts text, sends it to the AI, and returns the simplified JSON.
    [Core Functionality 2, 3, 4]
    """
    extracted_text = ""

    try:
        # Check for text input first (from JSON)
        if request.is_json and 'text' in request.json:
            print("--- BACKEND: Received TEXT data ---")
            extracted_text = request.json['text']

        # Check for file input (from FormData)
        elif 'file' in request.files:
            print("--- BACKEND: Received FILE data ---")
            file = request.files['file']

            if file.content_type == 'application/pdf':
                # Use PyPDF2 to extract text [Core Functionality 2]
                stream = io.BytesIO(file.read())
                reader = PyPDF2.PdfReader(stream)
                for page in reader.pages:
                    extracted_text += page.extract_text()
            else:
                return jsonify(error="Invalid file type", details="Please upload a PDF."), 400

        else:
            return jsonify(error="No input data", details="Please provide text or a PDF file."), 400

        # Check if text extraction was successful
        if not extracted_text:
            return jsonify(error="Empty report", details="Could not find any text to simplify."), 400

        # --- Send extracted text to the AI Engine [Core Functionality 3, 4] ---
        print("--- BACKEND: Sending text to AI Engine ---")

        # This calls Abdelrahman's function
        simplified_data = translation_engine.simplify_medical_text(extracted_text)

        print("--- BACKEND: Received simplified data from AI ---")

        # Return the AI's JSON response to the frontend
        return jsonify(simplified_data)

    except Exception as e:
        print(f"--- BACKEND: ERROR --- \n{e}")
        return jsonify(error="Server processing error", details=str(e)), 500


# --- Run the App ---
if __name__ == '__main__':
    # Runs the server on http://127.0.0.1:5000
    app.run(debug=True, port=5000)