jobs_data = {

    "python": [
        "Python Developer",
        "Backend Developer"
    ],

    "machine learning": [
        "ML Engineer",
        "AI Engineer"
    ],

    "flask": [
        "Flask Developer"
    ],

    "javascript": [
        "Frontend Developer"
    ]
}

def recommend_jobs(skills):

    jobs = []

    for skill in skills:

        if skill in jobs_data:

            jobs.extend(jobs_data[skill])

    return list(set(jobs))