import { useState } from "react";
import { extractResume, extractJD, runMatch, getSuggestions } from "./api";
import ScoreRing from "./components/ScoreRing";
import RubricBars from "./components/RubricBars";
import ATSReport from "./components/ATSReport";
import GapAnalysis from "./components/GapAnalysis";
import Suggestions from "./components/Suggestions";
import CandidateTable from "./components/CandidateTable";

const card = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" };
const primaryBtn = (dis) => ({ padding: "10px 20px", borderRadius: 8, fontWeight: 500, border: "none", background: dis ? "#d1d5db" : "#534AB7", color: dis ? "#9ca3af" : "#fff", cursor: dis ? "not-allowed" : "pointer" });
const secBtn = { padding: "8px 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" };

export default function App() {
  const [page, setPage] = useState("analyze");
  const [step, setStep] = useState("input");
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [profile, setProfile] = useState(null);
  const [jd, setJd] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [tab, setTab] = useState("ats");

  async function handleExtract() {
    setLoading("Extracting resume and JD with AI…"); setError("");
    try {
      const [p, j] = await Promise.all([extractResume(file), extractJD(jdText)]);
      setProfile(p); setJd(j); setStep("extracted");
    } catch (e) {
      setError(e.response?.data?.detail || "Extraction failed. Is the backend running on port 8000?");
    } finally { setLoading(""); }
  }

  async function handleAnalyze() {
    setLoading("Running match and ATS scoring…"); setError("");
    try {
      const a = await runMatch(profile, jd);
      setAnalysis(a);
      setLoading("Generating suggestions…");
      const s = await getSuggestions(profile, jd, a);
      setSuggestions(s); setStep("analyzed"); setTab("ats");
      setCandidates(prev => [{ name: profile.name, role: jd.role_title, overallScore: a.overall_score, atsScore: a.ats_report.ats_score, label: a.score_label, analysis: a, suggestions: s, profile, jd }, ...prev]);
    } catch (e) {
      setError(e.response?.data?.detail || "Analysis failed.");
    } finally { setLoading(""); }
  }

  function reset() {
    setStep("input"); setFile(null); setJdText(""); setProfile(null);
    setJd(null); setAnalysis(null); setSuggestions(null); setError("");
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* Sidebar */}
      <div style={{ width: 220, flexShrink: 0, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", padding: "20px 0" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #e5e7eb", marginBottom: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#534AB7" }}>AI Hire</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Intelligent recruiting</div>
        </div>
        {[{ id: "analyze", label: "Analyze match", icon: "🔍" }, { id: "dashboard", label: `Dashboard (${candidates.length})`, icon: "📊" }].map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", background: page === n.id ? "#EEEDFE" : "transparent", color: page === n.id ? "#534AB7" : "#374151", fontWeight: page === n.id ? 600 : 400, border: "none", textAlign: "left", cursor: "pointer", borderRight: page === n.id ? "3px solid #534AB7" : "3px solid transparent" }}>
            {n.icon} {n.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "12px 20px", borderTop: "1px solid #e5e7eb", fontSize: 11, color: "#9ca3af" }}>
          Powered by<br /><span style={{ color: "#534AB7", fontWeight: 600 }}>Claude Sonnet 4.6</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", borderBottom: "1px solid #e5e7eb", background: "#fff", flexShrink: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{page === "analyze" ? "Analyze match" : "Candidate dashboard"}</div>
          {page === "analyze" && step !== "input" && <button onClick={reset} style={secBtn}>Reset</button>}
        </div>

        <div style={{ flex: 1, padding: 28, overflow: "auto" }}>

          {/* Dashboard */}
          {page === "dashboard" && (
            <CandidateTable candidates={candidates} onSelect={c => {
              setProfile(c.profile); setJd(c.jd); setAnalysis(c.analysis);
              setSuggestions(c.suggestions); setStep("analyzed"); setPage("analyze"); setTab("ats");
            }} />
          )}

          {/* Analyze */}
          {page === "analyze" && (
            <>
              {/* Step 1: Input */}
              {step === "input" && (
                <div style={{ maxWidth: 900 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                      <div style={{ fontWeight: 600, marginBottom: 12 }}>📄 Resume (PDF)</div>
                      <label style={{ display: "block", border: "2px dashed #e5e7eb", borderRadius: 10, padding: "32px 20px", textAlign: "center", cursor: "pointer", background: file ? "#f0fdf4" : "#f9fafb", borderColor: file ? "#22c55e" : "#e5e7eb" }}>
                        <input type="file" accept=".pdf" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{file ? "✅" : "☁️"}</div>
                        <div style={{ fontWeight: 500, marginBottom: 4 }}>{file ? file.name : "Click to upload PDF"}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>{file ? `${(file.size/1024).toFixed(0)} KB` : "Max 5MB · text-based PDF"}</div>
                      </label>
                    </div>
                    <div style={card}>
                      <div style={{ fontWeight: 600, marginBottom: 12 }}>💼 Job description</div>
                      <textarea value={jdText} onChange={e => setJdText(e.target.value)}
                        placeholder={"Paste the full job description here…\n\nInclude requirements, responsibilities, and qualifications."}
                        style={{ width: "100%", minHeight: 160, padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, resize: "vertical", lineHeight: 1.6, outline: "none" }} />
                    </div>
                  </div>
                  {error && <div style={{ background: "#fef2f2", color: "#b91c1c", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13 }}>⚠ {error}</div>}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={handleExtract} disabled={!file || jdText.trim().length < 50 || !!loading} style={primaryBtn(!file || jdText.trim().length < 50 || !!loading)}>
                      {loading || "⚡ Extract profiles with AI"}
                    </button>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Step 1 of 2</span>
                  </div>
                </div>
              )}

              {/* Step 2: Extracted */}
              {step === "extracted" && profile && jd && (
                <div style={{ maxWidth: 900 }}>
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#166534" }}>
                    ✓ Profiles extracted. Review below then click Analyze.
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div style={card}>
                      <div style={{ fontWeight: 600, marginBottom: 12 }}>👤 Candidate</div>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>{profile.name}</div>
                      {profile.email && <div style={{ fontSize: 12, color: "#6b7280" }}>{profile.email}</div>}
                      {profile.location && <div style={{ fontSize: 12, color: "#6b7280" }}>{profile.location}</div>}
                      {profile.years_experience > 0 && <span style={{ display:"inline-block", marginTop:6, padding:"2px 10px", borderRadius:100, fontSize:11, background:"#EEEDFE", color:"#534AB7" }}>{profile.years_experience} yrs exp</span>}
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Skills</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {profile.skills?.slice(0,15).map(s => <span key={s} style={{ padding:"2px 8px", borderRadius:100, fontSize:11, background:"#f3f4f6" }}>{s}</span>)}
                        </div>
                      </div>
                    </div>
                    <div style={card}>
                      <div style={{ fontWeight: 600, marginBottom: 12 }}>💼 Role requirements</div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{jd.role_title}</div>
                      {jd.company && <div style={{ fontSize: 12, color: "#6b7280" }}>{jd.company}</div>}
                      {jd.min_years_experience > 0 && <span style={{ display:"inline-block", marginTop:6, padding:"2px 10px", borderRadius:100, fontSize:11, background:"#fef3c7", color:"#92400e" }}>{jd.min_years_experience}+ yrs required</span>}
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Required skills</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {jd.required_skills?.map(s => <span key={s} style={{ padding:"2px 8px", borderRadius:100, fontSize:11, background:"#fef2f2", color:"#b91c1c" }}>{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {error && <div style={{ background:"#fef2f2", color:"#b91c1c", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:13 }}>⚠ {error}</div>}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={handleAnalyze} disabled={!!loading} style={primaryBtn(!!loading)}>{loading || "🎯 Run full analysis"}</button>
                    <button onClick={reset} style={secBtn}>Start over</button>
                  </div>
                </div>
              )}

              {/* Step 3: Results */}
              {step === "analyzed" && analysis && (
                <div style={{ maxWidth: 960 }}>
                  <div style={{ ...card, marginBottom: 20, display: "flex", alignItems: "center", gap: 32 }}>
                    <ScoreRing score={Math.round(analysis.overall_score)} size={110} />
                    <div style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: 32 }}>
                      <ScoreRing score={Math.round(analysis.ats_report.ats_score)} size={90} label="ATS" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{profile?.name}</div>
                      <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>{jd?.role_title}{jd?.company ? ` at ${jd.company}` : ""}</div>
                      <span style={{ padding:"4px 14px", borderRadius:100, fontSize:13, background:"#EEEDFE", color:"#534AB7", fontWeight:600 }}>{analysis.score_label}</span>
                      <p style={{ fontSize:13, color:"#6b7280", marginTop:10, lineHeight:1.6 }}>{analysis.score_description}</p>
                    </div>
                    <button onClick={reset} style={secBtn}>Analyze new</button>
                  </div>

                  <div style={{ display:"flex", borderBottom:"1px solid #e5e7eb", marginBottom:20 }}>
                    {[{id:"ats",label:"🤖 ATS"},{id:"rubric",label:"📊 Rubric"},{id:"gaps",label:"🔍 Gaps"},{id:"suggest",label:"✨ Suggestions"}].map(t => (
                      <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"8px 16px", fontSize:13, border:"none", background:"transparent", cursor:"pointer", fontWeight:tab===t.id?600:400, color:tab===t.id?"#534AB7":"#6b7280", borderBottom:tab===t.id?"2px solid #534AB7":"2px solid transparent", marginBottom:-1 }}>{t.label}</button>
                    ))}
                  </div>

                  {tab === "ats"    && <ATSReport ats={analysis.ats_report} />}
                  {tab === "rubric" && <div style={card}><RubricBars rubric={analysis.rubric} /></div>}
                  {tab === "gaps"   && <GapAnalysis analysis={analysis} />}
                  {tab === "suggest" && <Suggestions report={suggestions} />}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}