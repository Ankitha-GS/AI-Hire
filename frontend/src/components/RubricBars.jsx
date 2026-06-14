const dims = [
    { key: "technical_skills", label: "Technical skills", weight: "35%" },
    { key: "experience_level", label: "Experience level", weight: "25%" },
    { key: "domain_knowledge", label: "Domain knowledge", weight: "20%" },
    { key: "education",        label: "Education",        weight: "10%" },
    { key: "soft_skills",      label: "Soft skills",      weight: "10%" },
  ];
  
  function color(s) {
    return s >= 75 ? "#22c55e" : s >= 55 ? "#534AB7" : s >= 35 ? "#f59e0b" : "#ef4444";
  }
  
  export default function RubricBars({ rubric }) {
    if (!rubric) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {dims.map(d => {
          const val = Math.round(rubric[d.key]?.score || 0);
          return (
            <div key={d.key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                <span>{d.label}</span>
                <span style={{ color: "#6b7280" }}>{val}/100 · <span style={{ color: "#9ca3af" }}>{d.weight}</span></span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: 100, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${val}%`, height: "100%", background: color(val), borderRadius: 100, transition: "width 0.8s ease" }} />
              </div>
              {rubric[d.key]?.rationale && (
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{rubric[d.key].rationale}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }