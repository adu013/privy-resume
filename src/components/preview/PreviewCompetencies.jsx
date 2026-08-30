import React from "react";

export default function PreviewCompetencies({ resumeData, isModern }) {
  const compList = resumeData.competencies || [];
  if (!compList.some(c => c.name)) return null;

  return (
    <div style={{ marginBottom: isModern ? "12px" : "0px" }}>
      <h4 className="resume-section-title">Core Competencies</h4>

      {isModern ? (
        /* Vertical bullet list layout for the narrow modern sidebar */
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {compList.map((c, idx) => (
            c.name && (
              <div key={idx} className="resume-text" style={{ fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>
                • {c.name}
              </div>
            )
          ))}
        </div>
      ) : (
        /* Inline dot list layout for the standard stacked classic view */
        <p className="resume-text" style={{ fontWeight: "500", fontSize: "12.5px", color: "#1e293b", lineHeight: "1.6", marginTop: "-4px" }}>
          {compList.map(c => c.name).filter(Boolean).join("  •  ")}
        </p>
      )}
    </div>
  );
}
