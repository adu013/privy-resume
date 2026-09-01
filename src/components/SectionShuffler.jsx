import React from "react";

export default function SectionShuffler({ resumeData, onInputChange }) {
  const defaultOrder = [
    "summary",
    "competencies",
    "experience",
    "projects",
    "education",
    "skills",
    "certifications",
    "awards",
    "references"
  ];

  const currentOrder = resumeData.sectionOrder || defaultOrder;

  const sectionLabels = {
    summary: "Summary / Profile",
    competencies: "Core Competencies",
    experience: "Work Experiences",
    projects: "Projects",
    education: "Education",
    skills: "Skills",
    certifications: "Certifications",
    references: "References",
    awards: "Awards & Achievements"
  };

  const moveSection = (index, direction) => {
    const newOrder = [...currentOrder];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    // Swap position elements smoothly in the array track
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    onInputChange({ target: { name: "sectionOrder", value: newOrder } });
  };

  return (
    <div style={{
      marginTop: "16px",
      padding: "16px",
      backgroundColor: "#0b1329",
      borderRadius: "8px",
      border: "1px solid #1e293b",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        ↕️ Section Priority Shuffler
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {currentOrder.map((sectionId, index) => (
          <div
            key={sectionId}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              backgroundColor: "#070d19",
              color: "white",
              border: "1px solid #1e293b",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>{sectionLabels[sectionId] || sectionId}</span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                type="button"
                disabled={index === 0}
                onClick={() => moveSection(index, -1)}
                style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: index === 0 ? "#1e293b" : "#4f46e5", border: "none", color: "white", cursor: index === 0 ? "not-allowed" : "pointer", fontSize: "11px" }}
              >
                ▲
              </button>
              <button
                type="button"
                disabled={index === currentOrder.length - 1}
                onClick={() => moveSection(index, 1)}
                style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: index === currentOrder.length - 1 ? "#1e293b" : "#4f46e5", border: "none", color: "white", cursor: index === currentOrder.length - 1 ? "not-allowed" : "pointer", fontSize: "11px" }}
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
