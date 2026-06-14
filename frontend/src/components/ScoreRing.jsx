export default function ScoreRing({ score, size = 100, label }) {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - score / 100);
    const color = score >= 75 ? "#22c55e" : score >= 55 ? "#534AB7" : score >= 35 ? "#f59e0b" : "#ef4444";
  
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ position: "relative", width: size, height: size }}>
          <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10"
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.8s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: size * 0.22, fontWeight: 700, color }}>{score}</span>
            <span style={{ fontSize: 9, color: "#9ca3af" }}>/100</span>
          </div>
        </div>
        {label && <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{label}</div>}
      </div>
    );
  }