![upload](https://github.com/user-attachments/assets/535f5dcc-422f-49b7-a105-2ee4393c8692)# AI-Hire – Smart AI Recruitment Platform

## Live Demo

https://ai-hire-hihg.onrender.com

---

## Overview

AI-Hire is an AI-powered recruitment platform that analyzes resumes, predicts ATS scores, recommends suitable jobs, and compares resumes with job descriptions using NLP techniques.

This project helps candidates improve their resumes and helps recruiters evaluate candidates more efficiently.

---

## Features

* Resume Upload System
* Resume Skill Extraction
* ATS Score Prediction
* Missing Skills Detection
* Resume Improvement Suggestions
* Recommended Jobs Based on Skills
* Resume vs Job Description Matching
* Candidate Dashboard
* PDF Resume Parsing

---

## Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap

### Backend

* Python
* Flask

### Database

* SQLite

### AI / NLP

* Scikit-learn
* NLTK
* PyPDF2

---

## How It Works

1. User uploads resume in PDF format
2. System extracts technical skills using NLP
3. ATS score is calculated
4. Missing skills and suggestions are generated
5. Recommended jobs are displayed
6. Resume is compared with pasted job description
7. Job match score is generated

---

## Project Screenshots

### Home Page

![home](https://github.com/user-attachments/assets/f9c1e070-1ba8-4d99-812c-7d7b91b05cc6)
<!DOCTYPE html>
<!-- saved from url=(0034)https://ai-hire-hihg.onrender.com/ -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>AI Hire</title>
    <link rel="stylesheet" href="./home_files/style.css">
</head>
<body>

<div class="container">

    <h1>AI Hire</h1>

    <a href="https://ai-hire-hihg.onrender.com/register">
        <button>Get Started</button>
    </a>

</div>


</body></html>


### Resume Upload Page

![Uploading<!DOCTYPE html>
<!-- saved from url=(0042)https://ai-hire-hihg.onrender.com/register -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>Register</title>

    <link rel="stylesheet" href="./upload_files/style.css">

</head>

<body>

<div class="container">

    <h2>AI Hire - Resume Analyzer</h2>

    <form action="https://ai-hire-hihg.onrender.com/upload" method="POST" enctype="multipart/form-data">

        <input type="text" name="name" placeholder="Enter Your Name" required="">

        <input type="email" name="email" placeholder="Enter Your Email" required="">

        <br><br>

        <label><b>Upload Resume (PDF)</b></label>

        <input type="file" name="resume" required="">

        <br><br>

        <label><b>Paste Job Description</b></label>

        <textarea name="job_description" rows="10" placeholder="Paste job description here..." style="width:100%; padding:10px;">        </textarea>

        <br><br>

        <button type="submit">

            Analyze Resume

        </button>

    </form>

</div>



</body></html> upload.png…]()


### ATS Result Page

![result](https://github.com/user-attachments/assets/bdc6e752-617c-40eb-88dc-33a098819a1b)
<!DOCTYPE html>
<!-- saved from url=(0040)https://ai-hire-hihg.onrender.com/upload -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>Result</title>

    <link rel="stylesheet" href="./result_files/style.css">

</head>

<body>

<div class="container">

    <h2>Hello A</h2>

    <hr>

    <h3>Detected Skills</h3>

    <ul>

        

            <li>python</li>

        

            <li>java</li>

        

            <li>sql</li>

        

            <li>machine learning</li>

        

            <li>flask</li>

        

            <li>html</li>

        

            <li>css</li>

        

            <li>javascript</li>

        

            <li>react</li>

        

    </ul>

    <hr>

    <h3>ATS Score</h3>

    <h2>100%</h2>

    <hr>

    <h3>Missing Skills</h3>

    <ul>

        

    </ul>

    <hr>

    <h3>Suggestions To Improve Resume</h3>

    <ul>

        

    </ul>

    <hr>

    <h3>Recommended Jobs</h3>

    <ul>

        

            <li>Python Developer</li>

        

            <li>Flask Developer</li>

        

            <li>AI Engineer</li>

        

            <li>ML Engineer</li>

        

            <li>Backend Developer</li>

        

            <li>Frontend Developer</li>

        

    </ul>

    <hr>

    <h3>Job Match Score</h3>

    <h2>77%</h2>

    <hr>

    <h3>Missing Keywords For This Job</h3>

    <ul>

        

    </ul>

    <hr>

    <a href="https://ai-hire-hihg.onrender.com/dashboard">

        <button>View Dashboard</button>

    </a>

</div>



</body></html>


---

## Installation

```bash
git clone https://github.com/Ankitha-GS/AI-Hire.git
cd AI-Hire
pip install -r requirements.txt
python app.py
```

---

## Future Enhancements

* AI Chatbot
* React Frontend
* Authentication System
* Resume PDF Report Download
* Real-Time Job API Integration
* Advanced ATS Algorithm
* Dark Mode UI
* PostgreSQL Database

---

## Resume Description

Developed an AI-powered recruitment platform using Flask and NLP that analyzes resumes, predicts ATS scores, recommends jobs, and performs resume-job matching using machine learning techniques.

---

## Author

Ankitha G S
