const icon = { high: "🔴", medium: "🟡", low: "🟢" };
const bg   = { high: "#fef2f2", medium: "#fffbeb", low: "#f0fdf4" };
const fg   = { high: "#b91c1c", medium: "#92400e", low: "#166534" };

export default function Suggestions({ report }) {
  if (!report) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={card}>
        <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Improvement suggestions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {report.suggestions?.map((s, i) => (
            <div key={i} style={{ background: "#f9fafb", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{icon[s.priority]}</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{s.title}</span>
                  <span style={{ padding: "1px 8px", borderRadius: 100, fontSize: 10, background: bg[s.priority], color: fg[s.priority] }}>{s.category}</span>
                </div>
                <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{s.detail}</p>
                {s.example && <p style={{ fontSize: 11, color: "#6b7280", marginTop: 6, fontStyle: "italic", borderLeft: "3px solid #e5e7eb", paddingLeft: 8 }}>{s.example}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {report.rewritten_summary && (
        <div style={card}>
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>✨ Rewritten summary</h3>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, fontStyle: "italic" }}>"{report.rewritten_summary}"</p>
        </div>
      )}

      {report.ats_optimized_skills_section && (
        <div style={{ ...card, borderColor: "#c4b5fd", background: "#faf5ff" }}>
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>🤖 ATS-optimized skills line</h3>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>Copy this into a "Skills" section at the top of your resume:</p>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 13, lineHeight: 1.8 }}>
            {report.ats_optimized_skills_section}
          </div>
        </div>
      )}
    </div>
  );
}

const card = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" };