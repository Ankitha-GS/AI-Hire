import google.generativeai as genai

genai.configure(api_key="AIzaSyDCbAKKos6dFrSHc3-fHsVlH9Jv6vv0LLw")

model = genai.GenerativeModel("gemini-1.5-flash")

def analyze_resume(resume_text, jd_text):

    prompt = f"""
    Analyze the following resume against the job description.

    Resume:
    {resume_text}

    Job Description:
    {jd_text}

    Return:
    1. Detected Job Role
    2. ATS Score out of 100
    3. Matching Skills
    4. Missing Skills
    5. Suggestions for improvement

    Give clean formatted response.
    """

    response = model.generate_content(prompt)

    return response.text