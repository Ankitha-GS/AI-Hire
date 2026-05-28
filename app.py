
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

from services.pdf_parser import extract_text_from_pdf
from services.ai_service import analyze_resume

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

    # SAVE FILE

    file.save(filepath)

    # EXTRACT RESUME TEXT

    resume_text = extract_text_from_pdf(filepath)

    # AI ANALYSIS

    analysis_result = analyze_resume(
        resume_text,
        job_description
    )

    # SAVE TO DATABASE

    user = User(

        name=name,

        email=email,

        skills="AI Generated",

        ats_score=0
    )

    db.session.add(user)

    db.session.commit()

    # RESULT PAGE

    return render_template(

        'result.html',

        name=name,

        result=analysis_result
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

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )

