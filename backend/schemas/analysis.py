from pydantic import BaseModel, Field
from typing import Optional


class ATSReport(BaseModel):
    ats_score: float
    keyword_hit_rate: float
    matched_keywords: list[str]
    missing_keywords: list[str]
    format_issues: list[str]
    recommendation: str


class RubricDimension(BaseModel):
    score: float
    weight: float
    rationale: str


class RubricBreakdown(BaseModel):
    technical_skills: RubricDimension
    experience_level: RubricDimension
    domain_knowledge: RubricDimension
    education: RubricDimension
    soft_skills: RubricDimension


class MatchAnalysis(BaseModel):
    overall_score: float
    score_label: str
    score_description: str
    rubric: RubricBreakdown
    matched: list[str]
    gaps: list[str]
    partial_matches: list[str]
    gap_narrative: str
    ats_report: ATSReport


class Suggestion(BaseModel):
    priority: str
    category: str
    title: str
    detail: str
    example: Optional[str] = None


class SuggestionReport(BaseModel):
    suggestions: list[Suggestion]
    rewritten_summary: str
    ats_optimized_skills_section: str