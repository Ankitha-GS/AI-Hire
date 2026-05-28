required_skills = [
    'python',
    'sql',
    'flask',
    'machine learning',
    'html',
    'css',
    'javascript'
]

def calculate_ats(user_skills):

    matched = []

    missing = []

    for skill in required_skills:

        if skill in user_skills:
            matched.append(skill)

        else:
            missing.append(skill)

    score = int((len(matched) / len(required_skills)) * 100)

    suggestions = []

    if score < 70:
        suggestions.append("Add more technical skills.")
        suggestions.append("Improve resume keywords.")
        suggestions.append("Add projects and internships.")

    return score, missing, suggestions