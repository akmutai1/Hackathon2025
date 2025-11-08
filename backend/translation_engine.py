
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables (to get the API key)
load_dotenv()

# Initialize the OpenAI client
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

def simplify_medical_text(raw_text):
    """
    Uses OpenAI to recognize and translate medical terms.
    """
    print("--- AI ENGINE: Received text for processing ---")

    # This is the "Medical Translation Engine"
    # The prompt is the most important part of your job.
    system_prompt = """


 {
      "simplified_terms": [
        {
          "term": "The medical term",
          "meaning": "A simple, one-sentence explanation of what it is.",
          "why_it_matters": "A simple, one-sentence explanation of why the patient should care about this."
        }
      ]
    }
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini", # Use a fast and cheap model for the hackathon
            response_format={ "type": "json_object" }, # Enforce JSON output
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": raw_text}
            ]
        )

        response_content = response.choices[0].message.content
        print("--- AI ENGINE: Received JSON response from OpenAI ---")

        # Load the JSON string into a Python dictionary
        json_data = json.loads(response_content)
        return json_data

    except Exception as e:
        print(f"--- AI ENGINE: ERROR --- \n{e}")
        # Return a structured error
        return {
            "error": "Failed to process the medical text.",
            "details": str(e)
        }

# --- You can use this part to test your file directly ---
if __name__ == '__main__':
    print("Testing translation engine...")
    test_text = "Patient shows signs of Atrial Fibrillation and a reduced Ejection Fraction."
    simplified_data = simplify_medical_text(test_text)
    print(json.dumps(simplified_data, indent=2))
