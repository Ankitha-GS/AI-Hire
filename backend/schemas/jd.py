from pydantic import BaseModel, Field
from typing import Optional


class JobRequirements(BaseModel):
    role_title: str
    company: Optional[str] = None
    required_skills: list[str] = Field(default_factory=list)
    preferred_skills: list[str] = Field(default_factory=list)
    min_years_experience: float = 0
    education_requirement: Optional[str] = None
    key_responsibilities: list[str] = Field(default_factory=list)
    must_haves: list[str] = Field(default_factory=list)
    keywords: list[str] = Field(default_factory=list)