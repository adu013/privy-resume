import React from "react";

export default function PreviewReferences({ resumeData }) {
  const refsList = resumeData.references || [];

  // If no reference name or title has been filled out yet, don't show the header
  if (!refsList.some(r => r.name || r.title)) return null;

  return (
    <div style={{ marginTop: "8px" }}>
      <h4 className="resume-section-title">References</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {refsList.map((ref, idx) => (
          (ref.name || ref.title) && (
            <div key={idx} style={{ fontSize: "12px" }}>
              <strong style={{ color: "#0f172a" }}>{ref.name}</strong>
              {ref.title && <div style={{ color: "#475569", fontStyle: "italic", fontSize: "11px" }}>{ref.title}</div>}
              {ref.company && <div style={{ color: "#334155", fontSize: "11px" }}>{ref.company}</div>}
              {ref.contact && <div style={{ color: "#64748b", fontSize: "11px", marginTop: "1px" }}>{ref.contact}</div>}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
