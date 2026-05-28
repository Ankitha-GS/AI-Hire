from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

from resume_parser import extract_skills
from ats import calculate_ats
from jobs import recommend_jobs
from matcher import match_resume_to_job

import os

app = Flask(__name__)

# DATABASE CONFIGURATION

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///aihire.db'

# UPLOAD FOLDER

app.config['UPLOAD_FOLDER'] = 'uploads'

db = SQLAlchemy(app)

# DATABASE MODEL

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100))

    email = db.Column(db.String(100))

    skills = db.Column(db.String(500))

    ats_score = db.Column(db.Integer)

# HOME PAGE

@app.route('/')

def home():

    return render_template('index.html')

# REGISTER PAGE

@app.route('/register')

def register():

    return render_template('register.html')

# RESUME UPLOAD

@app.route('/upload', methods=['POST'])

def upload():

    # GET FORM DATA

    name = request.form['name']

    email = request.form['email']

    job_description = request.form['job_description']

    # GET FILE

    file = request.files['resume']

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        app.config['UPLOAD_FOLDER'],
        filename
    )

    file.save(filepath)

    # EXTRACT SKILLS

    skills = extract_skills(filepath)

    # ATS SCORE

    ats_score, missing_skills, suggestions = calculate_ats(skills)

    # JOB RECOMMENDATION

    recommended_jobs = recommend_jobs(skills)

    # JOB MATCHING

    job_match_score, missing_keywords = match_resume_to_job(
        skills,
        job_description
    )

    # SAVE TO DATABASE

    user = User(

        name=name,

        email=email,

        skills=", ".join(skills),

        ats_score=ats_score
    )

    db.session.add(user)

    db.session.commit()

    # RESULT PAGE

    return render_template(

        'result.html',

        name=name,

        skills=skills,

        ats_score=ats_score,

        missing_skills=missing_skills,

        suggestions=suggestions,

        recommended_jobs=recommended_jobs,

        job_match_score=job_match_score,

        missing_keywords=missing_keywords
    )

# DASHBOARD

@app.route('/dashboard')

def dashboard():

    users = User.query.all()

    return render_template(
        'dashboard.html',
        users=users
    )

# RUN APP

if __name__ == '__main__':

    with app.app_context():

        db.create_all()

    app.run(debug=True)