import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

from schemas.resume import CandidateProfile
from schemas.jd import JobRequirements
from schemas.analysis import MatchAnalysis, SuggestionReport
from services.ats_scorer import compute_ats_score

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

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


def run_match_analysis(
    profile: CandidateProfile,
    jd: JobRequirements
) -> MatchAnalysis:

    ats = compute_ats_score(profile, jd)

    prompt = f"""
You are a senior technical recruiter doing deep semantic resume-to-JD matching.

Assess conceptual fit, transferable experience, and growth trajectory.

Return ONLY valid JSON.

Schema:
{{
  "overall_score": 72,
  "score_label": "Good Match",
  "score_description": "Two sentence summary.",
  "rubric": {{
    "technical_skills": {{
      "score": 80,
      "weight": 0.35,
      "rationale": "one sentence"
    }},
    "experience_level": {{
      "score": 70,
      "weight": 0.25,
      "rationale": "one sentence"
    }},
    "domain_knowledge": {{
      "score": 65,
      "weight": 0.20,
      "rationale": "one sentence"
    }},
    "education": {{
      "score": 90,
      "weight": 0.10,
      "rationale": "one sentence"
    }},
    "soft_skills": {{
      "score": 75,
      "weight": 0.10,
      "rationale": "one sentence"
    }}
  }},
  "matched": ["requirement clearly met"],
  "gaps": ["critical missing requirement"],
  "partial_matches": ["partial alignment"],
  "gap_narrative": "3-4 sentences"
}}

Candidate:
{profile.model_dump_json(indent=2)}

Job Description:
{jd.model_dump_json(indent=2)}
"""

    response = model.generate_content(prompt)

    data = _clean_json(response.text)

    data["ats_report"] = ats.model_dump()

    return MatchAnalysis(**data)


def run_suggestions(
    profile: CandidateProfile,
    jd: JobRequirements,
    analysis: MatchAnalysis
) -> SuggestionReport:

    prompt = f"""
You are a career coach tailoring resumes for specific roles.

Return ONLY valid JSON.

Schema:
{{
  "suggestions": [
    {{
      "priority": "high",
      "category": "Skills",
      "title": "short action title",
      "detail": "specific advice",
      "example": "Before: X. After: Y."
    }}
  ],
  "rewritten_summary": "Professional summary",
  "ats_optimized_skills_section": "Comma separated skills"
}}

Generate 6-8 suggestions.

Candidate:
{profile.model_dump_json(indent=2)}

Job:
{jd.model_dump_json(indent=2)}

Gaps:
{analysis.gaps}

ATS Missing Keywords:
{analysis.ats_report.missing_keywords}
"""

    response = model.generate_content(prompt)

    data = _clean_json(response.text)

    return SuggestionReport(**data)