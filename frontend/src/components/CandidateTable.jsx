const colors = ["#EEEDFE:#534AB7","#dcfce7:#166534","#fef3c7:#92400e","#fee2e2:#b91c1c","#dbeafe:#1e40af"];
const sc = s => s >= 75 ? "#22c55e" : s >= 55 ? "#534AB7" : s >= 35 ? "#f59e0b" : "#ef4444";
const ini = n => n.split(" ").map(x => x[0]).join("").substring(0,2).toUpperCase();

export default function CandidateTable({ candidates, onSelect }) {
  if (!candidates?.length) return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
      <p>No candidates yet. Analyze a resume to add them here.</p>
    </div>
  );

  const sorted = [...candidates].sort((a, b) => b.overallScore - a.overallScore);

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
      <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 20 }}>
        Candidate ranking — {candidates[0]?.role || "Open role"}
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            {["#","Candidate","ATS","Match","Label",""].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => {
            const [bg, fg] = colors[i % colors.length].split(":");
            const ms = Math.round(c.overallScore);
            const as = Math.round(c.atsScore);
            return (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={td}><span style={{ color: "#9ca3af", fontWeight: 600 }}>#{i+1}</span></td>
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{ini(c.name)}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.role}</div>
                    </div>
                  </div>
                </td>
                <td style={td}><span style={{ fontWeight: 600, color: sc(as) }}>{as}</span></td>
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60, height: 5, background: "#e5e7eb", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ width: `${ms}%`, height: "100%", background: sc(ms), borderRadius: 100 }} />
                    </div>
                    <span style={{ fontWeight: 600, color: sc(ms) }}>{ms}</span>
                  </div>
                </td>
                <td style={td}><span style={{ padding: "2px 10px", borderRadius: 100, fontSize: 11, background: "#EEEDFE", color: "#534AB7" }}>{c.label}</span></td>
                <td style={td}><button onClick={() => onSelect?.(c)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, border: "1px solid #e5e7eb", background: "transparent" }}>View</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const td = { padding: "12px 12px", fontSize: 13, verticalAlign: "middle" };