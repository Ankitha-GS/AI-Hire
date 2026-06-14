import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

from schemas.resume import CandidateProfile
from schemas.jd import JobRequirements

load_dotenv()
import os

print("GEMINI_API_KEY =", os.getenv("GEMINI_API_KEY"))

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Model
model = genai.GenerativeModel("gemini-2.5-flash")


def _clean_json(text: str) -> dict:
    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.startswith("```"):
        text = text.replace("```", "", 1)

    if text.endswith("```"):
        text = text.rsplit("```", 1)[0]

    return json.loads(text.strip())


def extract_resume_profile(resume_text: str) -> CandidateProfile:
    prompt = f"""
You extract structured candidate profiles from resume text.

Return ONLY valid JSON.
Do not return markdown.
Do not return explanations.

Schema:
{{
  "name": "string",
  "email": "string or null",
  "phone": "string or null",
  "location": "string or null",
  "summary": "string or null",
  "skills": ["skill"],
  "experience": [
    {{
      "title": "string",
      "company": "string",
      "duration": "string",
      "highlights": ["string"],
      "technologies": ["string"]
    }}
  ],
  "education": [
    {{
      "degree": "string",
      "school": "string",
      "year": "string or null"
    }}
  ],
  "years_experience": 0.0,
  "certifications": ["string"]
}}

Resume Text:
{resume_text[:5000]}
"""

    response = model.generate_content(prompt)

    return CandidateProfile(
        **_clean_json(response.text)
    )


def extract_jd_requirements(jd_text: str) -> JobRequirements:
    prompt = f"""
You extract structured job requirements from job descriptions.

Return ONLY valid JSON.
Do not return markdown.
Do not return explanations.

Schema:
{{
  "role_title": "string",
  "company": "string or null",
  "required_skills": ["string"],
  "preferred_skills": ["string"],
  "min_years_experience": 0.0,
  "education_requirement": "string or null",
  "key_responsibilities": ["string"],
  "must_haves": ["string"],
  "nice_to_haves": ["string"],
  "keywords": ["string"]
}}

Job Description:
{jd_text[:4000]}
"""

    response = model.generate_content(prompt)

    return JobRequirements(
        **_clean_json(response.text)
    )