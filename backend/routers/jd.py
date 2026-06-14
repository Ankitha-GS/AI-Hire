from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm_extractor import extract_jd_requirements

router = APIRouter(prefix="/api/jd", tags=["jd"])

class JDInput(BaseModel):
    text: str

@router.post("/extract")
async def extract_jd(data: JDInput):
    try:
        print("JD REQUEST RECEIVED")
        print("TEXT LENGTH:", len(data.text))

        result = extract_jd_requirements(data.text)

        print("JD EXTRACTION SUCCESS")

        return result

    except Exception as e:
        print("JD ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))