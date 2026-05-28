
import google.generativeai as genai
import os

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# WORKING STABLE MODEL
model = genai.GenerativeModel("gemini-1.0-pro")

def analyze_resume(resume_text, jd_text):

    # LIMIT TOKENS
    resume_text = resume_text[:3000]
    jd_text = jd_text[:2000]

    prompt = f"""
    Compare this resume with the job description.

    Resume:
    {resume_text}

    Job Description:
    {jd_text}

    Return:
    1. ATS Score
    2. Matching Skills
    3. Missing Skills
    4. Suggestions
    5. Detected Role
    """

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"Error: {str(e)}"

