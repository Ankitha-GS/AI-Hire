from fastapi import APIRouter, UploadFile, File, HTTPException
from services.pdf_parser import extract_text_from_pdf
from services.llm_extractor import extract_resume_profile
from schemas.resume import CandidateProfile

router = APIRouter(prefix="/api/resume", tags=["resume"])


@router.post("/extract", response_model=CandidateProfile)
async def extract_resume(file: UploadFile = File(...)):
    try:
        print("STEP 1: File received")

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(400, "Only PDF files accepted")

        contents = await file.read()
        print("STEP 2: File read successfully")

        text = extract_text_from_pdf(contents)
        print("STEP 3: PDF text extracted")

        print("TEXT LENGTH:", len(text))

        if len(text.strip()) < 100:
            raise HTTPException(
                422,
                "Could not extract text. Use a text-based PDF, not a scanned image."
            )

        result = extract_resume_profile(text)
        print("STEP 4: Gemini extraction completed")

        return result

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(500, str(e))