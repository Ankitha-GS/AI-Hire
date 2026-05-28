import PyPDF2

skills_db = [
    'python',
    'java',
    'sql',
    'machine learning',
    'flask',
    'django',
    'html',
    'css',
    'javascript',
    'react'
]

def extract_skills(pdf_path):

    text = ""

    with open(pdf_path, 'rb') as file:

        reader = PyPDF2.PdfReader(file)

        for page in reader.pages:
            text += page.extract_text().lower()

    found_skills = []

    for skill in skills_db:
        if skill in text:
            found_skills.append(skill)

    return found_skills