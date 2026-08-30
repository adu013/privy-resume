import React from "react";

export default function SkillsForm({
  resumeData, onInputChange, onAddItem, onRemoveItem, onAddHighlight, onRemoveHighlight
}) {
  const emptySkill = { name: "", highlights: [""] };
  const listData = resumeData.skillsList || [emptySkill];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">7. Core Skills</h3>

      {listData.map((skill, sIdx) => (
        <div key={sIdx} style={{ borderBottom: "1px dashed #334155", paddingBottom: "24px", marginBottom: "12px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#a855f7" }}>Skill Category #{sIdx + 1}</span>
            {listData.length > 1 && (
              <button
                type="button" onClick={() => onRemoveItem("skillsList", sIdx)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Remove Category
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label className="input-label">Skill Group Name</label>
              <input
                type="text" name="name" value={skill.name || ""}
                onChange={(e) => onInputChange(e, sIdx, "skillsList")} placeholder="Programming Languages" className="form-input"
              />
            </div>
          </div>

          {/* SUB HIGHLIGHT LIST COMPONENT ENTRIES */}
          <div style={{ marginTop: "18px", paddingLeft: "10px", borderLeft: "2px solid #1e293b" }}>
            <label className="input-label" style={{ marginBottom: "8px", display: "block" }}>Description Lines (List items)</label>

            {(skill.highlights || [""]).map((bullet, bulletIdx) => (
              <div key={bulletIdx} style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
                <span style={{ color: "#475569", fontSize: "14px" }}>•</span>
                <input
                  type="text" value={bullet}
                  onChange={(e) => onInputChange(e, sIdx, "skillsList", bulletIdx)}
                  placeholder="JavaScript, TypeScript, Python..." className="form-input"
                />
                {skill.highlights.length > 1 && (
                  <button
                    type="button" onClick={() => onRemoveHighlight(sIdx, bulletIdx)}
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button" onClick={() => onAddHighlight(sIdx)}
              style={{ marginTop: "10px", padding: "4px 8px", background: "#0f172a", color: "#94a3b8", border: "1px dashed #334155", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
            >
              + Add Description Line
            </button>
          </div>

        </div>
      ))}

      <button
        type="button" onClick={() => onAddItem("skillsList", emptySkill)}
        style={{ padding: "8px 12px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", alignSelf: "start" }}
      >
        + Add Skill Category
      </button>
    </div>
  );
}
