import json
import os
import google.generativeai as genai
from dotenv import load_dotenv
from schemas.resume import CandidateProfile
from schemas.jd import JobRequirements
from schemas.analysis import MatchAnalysis, SuggestionReport
from services.ats_scorer import compute_ats_score

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


def _clean_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
    if text.endswith("```"):
        text = text.rsplit("```", 1)[0]
    return json.loads(text.strip())


def run_match_analysis(profile: CandidateProfile, jd: JobRequirements) -> MatchAnalysis:
    ats = compute_ats_score(profile, jd)

    prompt = """
You are a senior technical recruiter doing deep semantic resume-to-JD matching.
Assess conceptual fit, transferable experience, and growth trajectory — not just keywords.
Return ONLY valid JSON. No markdown. No explanation.
Schema:
{
  "overall_score": 72,
  "score_label": "Good Match",
  "score_description": "Two sentence summary.",
  "rubric": {
    "technical_skills":  {"score": 80, "weight": 0.35, "rationale": "one sentence"},
    "experience_level":  {"score": 70, "weight": 0.25, "rationale": "one sentence"},
    "domain_knowledge":  {"score": 65, "weight": 0.20, "rationale": "one sentence"},
    "education":         {"score": 90, "weight": 0.10, "rationale": "one sentence"},
    "soft_skills":       {"score": 75, "weight": 0.10, "rationale": "one sentence"}
  },
  "matched": ["requirement clearly met"],
  "gaps": ["critical missing requirement"],
  "partial_matches": ["partial alignment"],
  "gap_narrative": "3-4 sentences on what is missing and why it matters."
}
score_label must be one of: Strong Match, Good Match, Partial Match, Weak Match

Candidate:
""" + profile.model_dump_json(indent=2) + """

Job:
""" + jd.model_dump_json(indent=2)

    response = model.generate_content(prompt)
    data = _clean_json(response.text)
    data["ats_report"] = ats.model_dump()
    return MatchAnalysis(**data)


def run_suggestions(profile: CandidateProfile, jd: JobRequirements, analysis: MatchAnalysis) -> SuggestionReport:
    prompt = """
You are a career coach tailoring resumes for specific roles.
Return ONLY valid JSON. No markdown. No explanation.
Schema:
{
  "suggestions": [
    {
      "priority": "high",
      "category": "Skills",
      "title": "short action title",
      "detail": "2-3 sentences of specific advice.",
      "example": "Before: X. After: Y."
    }
  ],
  "rewritten_summary": "3-sentence professional summary rewritten for this exact role.",
  "ats_optimized_skills_section": "Python, FastAPI, Docker — comma-separated skills line with all matched and missing keywords."
}
priority: high | medium | low
category: Skills | Experience | Framing | Keywords | Education | ATS
Generate 6-8 suggestions ordered by impact.

Candidate:
""" + profile.model_dump_json(indent=2) + """
Job:
""" + jd.model_dump_json(indent=2) + """
Gaps: """ + str(analysis.gaps) + """
ATS missing: """ + str(analysis.ats_report.missing_keywords)

    response = model.generate_content(prompt)
    return SuggestionReport(**_clean_json(response.text))