import React from "react";

export default function CompetenciesForm({ resumeData, onInputChange, onAddItem, onRemoveItem }) {
  const emptyItem = { name: "" };
  const itemsList = resumeData.competencies || [emptyItem];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3 className="form-section-title">3. Core Competencies</h3>
        <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
          Add your key technical or professional capabilities (e.g., Project Management, Python, Leadership).
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {itemsList.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="text"
              name="name"
              value={item.name || ""}
              onChange={(e) => onInputChange(e, idx, "competencies")}
              placeholder="e.g., Problem Solving"
              className="form-input"
              style={{ flex: 1 }}
            />
            {itemsList.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveItem("competencies", idx)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "14px", padding: "0 6px" }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onAddItem("competencies", emptyItem)}
        style={{ padding: "6px 12px", background: "#0f172a", color: "#94a3b8", border: "1px dashed #334155", borderRadius: "6px", cursor: "pointer", fontSize: "11px", alignSelf: "start" }}
      >
        + Add Competency
      </button>
    </div>
  );
}
