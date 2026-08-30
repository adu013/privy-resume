import React from "react";

export default function PreviewSkills({ resumeData, isModern }) {
  const skillsList = resumeData.skillsList || [];
  if (!skillsList.some(s => s.name)) return null;

  return (
    <div style={{ marginBottom: isModern ? "12px" : "0px" }}>
      <h4 className="resume-section-title">Skills</h4>

      {skillsList.map((skill, idx) => {
        if (!skill.name) return null;
        const subItems = skill.highlights ? skill.highlights.filter(Boolean).join(", ") : "";

        return (
          <div key={idx} style={{ marginBottom: isModern ? "8px" : "4px", fontSize: "13px" }}>
            <strong style={{ color: "#0f172a", fontSize: isModern ? "11.5px" : "13px", textTransform: isModern ? "uppercase" : "none" }}>
              {skill.name}{isModern ? "" : ": "}
            </strong>
            {subItems && (
              <span className="resume-text" style={{ fontSize: isModern ? "11.5px" : "13px", color: isModern ? "#475569" : "#334155", display: isModern ? "block" : "inline", marginTop: isModern ? "2px" : "0" }}>
                {subItems}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
