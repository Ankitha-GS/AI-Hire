import axios from "axios";
const BASE = "https://ai-hire-backend.onrender.com";

export async function extractResume(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await axios.post(`${BASE}/api/resume/extract`, form);
  return res.data;
}

export async function extractJD(text) {
  const res = await axios.post(`${BASE}/api/jd/extract`, { text });
  return res.data;
}

export async function runMatch(profile, jd) {
  const res = await axios.post(`${BASE}/api/analysis/match`, { profile, jd });
  return res.data;
}

export async function getSuggestions(profile, jd, analysis) {
  const res = await axios.post(`${BASE}/api/analysis/suggest`, { profile, jd, analysis });
  return res.data;
}