import { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import './App.css';

export default function App() {
  const formData = new FormData();

  const [yourname, setName] = useState("");
  const [jobtitle, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [resume, setResume] = useState(null);
  const [feedback, setFeedback] = useState("");


async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("name", yourname);
  formData.append("jobtitle", jobtitle);
  formData.append("company", company);

  const response = await fetch('/api/review', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  setFeedback(data.feedback);
}



  
  return (
    
    <form className="resume-form" onSubmit={handleSubmit}>
      <h1>Resume Reviewer</h1>
      <p>Upload your resume and add your target role to get feedback.</p>
      <label htmlFor="yourname">Your name</label>
      <input id="yourname" type="text" value={yourname} onChange={(e) => setName(e.target.value)}/>
      <label htmlFor="company">Company</label>
      <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
      <label htmlFor="jobtitle">Job title</label>
      <input id="jobtitle" type="text" value={jobtitle} onChange={(e) => setJob(e.target.value)}/>
      <label htmlFor="resume">Resume (PDF)</label>
      <input id="resume" type="file" accept=".pdf"   onChange={(e) => setResume(e.target.files[0])}
 />

      <button type="submit">Review resume</button>
      <div className="review-feedback"><ReactMarkdown>{feedback}</ReactMarkdown></div>
    </form>
    
  );
}
