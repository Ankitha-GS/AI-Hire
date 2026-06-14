export default function GapAnalysis({ analysis }) {
    if (!analysis) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={card}>
          <h4 style={title}>Gap narrative</h4>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{analysis.gap_narrative}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={card}>
            <h4 style={{ ...title, color: "#166534" }}>✓ Matched</h4>
            <div style={chips}>
              {analysis.matched?.map((m, i) => <span key={i} style={greenChip}>{m}</span>)}
            </div>
          </div>
          <div style={card}>
            <h4 style={{ ...title, color: "#b91c1c" }}>✗ Gaps</h4>
            <div style={chips}>
              {analysis.gaps?.map((g, i) => <span key={i} style={redChip}>{g}</span>)}
              {analysis.partial_matches?.map((p, i) => <span key={i} style={yellowChip}>{p}</span>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const card = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px" };
  const title = { fontSize: 13, fontWeight: 600, marginBottom: 10 };
  const chips = { display: "flex", flexWrap: "wrap", gap: 6 };
  const greenChip = { padding: "3px 10px", borderRadius: 100, fontSize: 11, background: "#f0fdf4", color: "#166534" };
  const redChip = { padding: "3px 10px", borderRadius: 100, fontSize: 11, background: "#fef2f2", color: "#b91c1c" };
  const yellowChip = { padding: "3px 10px", borderRadius: 100, fontSize: 11, background: "#fffbeb", color: "#92400e" };