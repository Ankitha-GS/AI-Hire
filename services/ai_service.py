
import google.generativeai as genai
import os

API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)

def analyze_resume(resume_text, jd_text):

    try:

        model = genai.GenerativeModel("gemini-pro")

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

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"AI Error: {str(e)}"

