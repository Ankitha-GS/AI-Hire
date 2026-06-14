export default function ATSReport({ ats }) {
    if (!ats) return null;
    const score = Math.round(ats.ats_score);
    const c = score >= 75 ? "#22c55e" : score >= 55 ? "#f59e0b" : "#ef4444";
  
    return (
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 22 }}>🤖</span>
          <h3 style={{ fontWeight: 600, fontSize: 15 }}>ATS Score</h3>
          <span style={{ marginLeft: "auto", fontSize: 32, fontWeight: 700, color: c }}>
            {score}<span style={{ fontSize: 14, color: "#9ca3af" }}>/100</span>
          </span>
        </div>
  
        <p style={{ fontSize: 13, color: "#374151", marginBottom: 16 }}>{ats.recommendation}</p>
  
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
            <span style={{ color: "#6b7280" }}>Keyword hit rate</span>
            <span style={{ fontWeight: 600 }}>{ats.keyword_hit_rate}%</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: 100, height: 6 }}>
            <div style={{ width: `${ats.keyword_hit_rate}%`, height: "100%", background: "#534AB7", borderRadius: 100, transition: "width 0.8s ease" }} />
          </div>
        </div>
  
        {ats.missing_keywords?.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Missing keywords ({ats.missing_keywords.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {ats.missing_keywords.map(k => <span key={k} style={redChip}>{k}</span>)}
            </div>
          </div>
        )}
  
        {ats.matched_keywords?.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Matched keywords ({ats.matched_keywords.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {ats.matched_keywords.slice(0, 12).map(k => <span key={k} style={greenChip}>{k}</span>)}
            </div>
          </div>
        )}
  
        {ats.format_issues?.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Format issues</div>
            {ats.format_issues.map((f, i) => (
              <div key={i} style={{ fontSize: 12, color: "#92400e", background: "#fffbeb", borderRadius: 6, padding: "6px 10px", marginBottom: 4 }}>⚠ {f}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  const card = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" };
  const redChip = { padding: "2px 10px", borderRadius: 100, fontSize: 11, background: "#fef2f2", color: "#b91c1c" };
  const greenChip = { padding: "2px 10px", borderRadius: 100, fontSize: 11, background: "#f0fdf4", color: "#166534" };