from fastapi import APIRouter
from pydantic import BaseModel
from schemas.resume import CandidateProfile
from schemas.jd import JobRequirements
from schemas.analysis import MatchAnalysis, SuggestionReport
from services.matcher import run_match_analysis, run_suggestions

router = APIRouter(prefix="/api/analysis", tags=["analysis"])


class MatchInput(BaseModel):
    profile: CandidateProfile
    jd: JobRequirements


class SuggestInput(BaseModel):
    profile: CandidateProfile
    jd: JobRequirements
    analysis: MatchAnalysis


@router.post("/match", response_model=MatchAnalysis)
async def match(body: MatchInput):
    return run_match_analysis(body.profile, body.jd)


@router.post("/suggest", response_model=SuggestionReport)
async def suggest(body: SuggestInput):
    return run_suggestions(body.profile, body.jd, body.analysis)