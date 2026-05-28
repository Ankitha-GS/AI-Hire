def match_resume_to_job(user_skills, job_description):

    job_description = job_description.lower()

    matched = []

    missing = []

    required_keywords = [
        'python',
        'sql',
        'machine learning',
        'flask',
        'html',
        'css',
        'javascript',
        'react',
        'django'
    ]

    # MATCHED SKILLS

    for skill in user_skills:

        if skill.lower() in job_description:

            matched.append(skill)

    # MISSING KEYWORDS

    for keyword in required_keywords:

        if keyword in job_description and keyword not in user_skills:

            missing.append(keyword)

    # SCORE CALCULATION

    if len(required_keywords) == 0:

        score = 0

    else:

        score = int(
            (len(matched) / len(required_keywords)) * 100
        )

    return score, missing