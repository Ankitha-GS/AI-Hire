from schemas.resume import CandidateProfile
from schemas.jd import JobRequirements
from schemas.analysis import ATSReport


def compute_ats_score(profile: CandidateProfile, jd: JobRequirements) -> ATSReport:
    resume_blob = _flatten(profile).lower()

    all_keywords = list(set(
        [k.lower() for k in jd.keywords] +
        [s.lower() for s in jd.required_skills] +
        [m.lower() for m in jd.must_haves]
    ))

    matched, missing = [], []
    for kw in all_keywords:
        root = kw.rstrip("s").rstrip("ing").rstrip("ed")
        if kw in resume_blob or (len(root) > 3 and root in resume_blob):
            matched.append(kw)
        else:
            missing.append(kw)

    total = len(all_keywords) if all_keywords else 1
    hit_rate = len(matched) / total
    title_score = _title_match(profile, jd)
    exp_score = _exp_match(profile, jd)
    format_issues = _format_check(profile)
    penalty = len(format_issues) * 4

    raw = (hit_rate * 60) + (title_score * 20) + (exp_score * 20) - penalty
    ats_score = round(max(0.0, min(100.0, raw)), 1)

    if ats_score >= 80:
        rec = "Excellent ATS compatibility. Likely to pass automated screening."
    elif ats_score >= 60:
        rec = "Good ATS score. Add missing keywords naturally to improve further."
    elif ats_score >= 40:
        rec = "Moderate ATS risk. Resume may be filtered before a human sees it."
    else:
        rec = "High ATS risk. Rewrite to include role-critical keywords throughout."

    return ATSReport(
        ats_score=ats_score,
        keyword_hit_rate=round(hit_rate * 100, 1),
        matched_keywords=matched,
        missing_keywords=missing[:15],
        format_issues=format_issues,
        recommendation=rec
    )


def _flatten(profile: CandidateProfile) -> str:
    parts = [profile.summary or "", " ".join(profile.skills), " ".join(profile.certifications)]
    for ex in profile.experience:
        parts += [ex.title, ex.company] + ex.highlights + ex.technologies
    for ed in profile.education:
        parts.append(ed.degree + " " + ed.school)
    return " ".join(parts)


def _title_match(profile: CandidateProfile, jd: JobRequirements) -> float:
    target = set(jd.role_title.lower().split())
    for ex in profile.experience:
        if target & set(ex.title.lower().split()):
            return 1.0
    return 0.3


def _exp_match(profile: CandidateProfile, jd: JobRequirements) -> float:
    if jd.min_years_experience == 0:
        return 1.0
    return min(1.0, profile.years_experience / jd.min_years_experience)


def _format_check(profile: CandidateProfile) -> list[str]:
    issues = []
    if not profile.email:
        issues.append("No email detected — ATS may fail to contact candidate")
    if profile.years_experience == 0:
        issues.append("Years of experience unclear — add dates to all roles")
    if len(profile.skills) < 5:
        issues.append("Thin skills section — add a dedicated Skills list")
    return issues