import React from "react";

export default function PreviewAwards({ resumeData }) {
  const awardsList = resumeData.awards || [];
  if (!awardsList.some(a => a.title)) return null;

  return (
    <div style={{ marginTop: "12px" }}>
      <h4 className="resume-section-title">Awards & Achievements</h4>

      {awardsList.map((award, idx) => (
        award.title && (
          <div key={idx} style={{ marginBottom: "8px", pageBreakInside: "avoid", breakInside: "avoid" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                {award.title} {award.issuer && <span style={{ fontWeight: "normal", color: "#475569" }}>| {award.issuer}</span>}
              </strong>
              {award.date && <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: "600" }}>{award.date}</span>}
            </div>
            {award.summary && <p className="resume-text" style={{ marginTop: "2px", fontSize: "12px" }}>{award.summary}</p>}
          </div>
        )
      ))}
    </div>
  );
}
