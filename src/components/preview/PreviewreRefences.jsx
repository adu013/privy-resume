import React from "react";

export default function PreviewReferences({ resumeData }) {
  const refsList = resumeData.references || [];
  const skillsList = resumeData.skillsList || [];
  const hasRefs = refsList.some(r => r.name || r.title);
  const hasSkills = skillsList.some(s => s.name);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* UPGRADED DYNAMIC SKILLS PREVIEW BLOCK */}
      {hasSkills && (
        <div>
          <h4 className="resume-section-title">Skills</h4>
          {skillsList.map((skill, idx) => (
            skill.name && (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "13px", color: "#0f172a" }}>{skill.name}: </strong>

                {/* Renders sub descriptions inline or formatted based on your preference */}
                {skill.highlights && skill.highlights.length > 0 && (
                  <span className="resume-text" style={{ fontSize: "13px" }}>
                    {skill.highlights.filter(Boolean).join(", ")}
                  </span>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* References Grid block */}
      {hasRefs && (
        <div>
          <h4 className="resume-section-title">References</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {refsList.map((ref, idx) => (
              (ref.name || ref.title) && (
                <div key={idx} style={{ fontSize: "13px" }}>
                  <strong style={{ color: "#0f172a" }}>{ref.name}</strong>
                  {ref.title && <div style={{ color: "#475569", fontStyle: "italic", fontSize: "12px" }}>{ref.title}</div>}
                  {ref.company && <div style={{ color: "#334155", fontSize: "12px" }}>{ref.company}</div>}
                  {ref.contact && <div style={{ color: "#64748b", fontSize: "11.5px", marginTop: "2px" }}>{ref.contact}</div>}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
