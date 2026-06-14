from pydantic import BaseModel, Field
from typing import Optional


class ExperienceItem(BaseModel):
    title: str
    company: str
    duration: str
    highlights: list[str] = Field(default_factory=list)
    technologies: list[str] = Field(default_factory=list)


class EducationItem(BaseModel):
    degree: str
    school: str
    year: Optional[str] = None


class CandidateProfile(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    skills: list[str] = Field(default_factory=list)
    experience: list[ExperienceItem] = Field(default_factory=list)
    education: list[EducationItem] = Field(default_factory=list)
    years_experience: float = 0
    certifications: list[str] = Field(default_factory=list)