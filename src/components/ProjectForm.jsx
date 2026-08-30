import React from "react";

export default function ProjectForm({
  resumeData, onInputChange, onAddItem, onRemoveItem, onAddHighlight, onRemoveHighlight
}) {
  const emptyProj = { name: "", projStart: "", projEnd: "", summary: "", highlights: [""] };
  const projsList = resumeData.projects || [emptyProj];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">6. Projects</h3>

      {projsList.map((proj, projIdx) => (
        <div key={projIdx} style={{ borderBottom: "1px dashed #334155", paddingBottom: "24px", marginBottom: "12px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#a855f7" }}>Project #{projIdx + 1}</span>
            {projsList.length > 1 && (
              <button
                type="button" onClick={() => onRemoveItem("projects", projIdx)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Remove Project
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label className="input-label">Project Name</label>
              <input
                type="text" name="name" value={proj.name || ""}
                onChange={(e) => onInputChange(e, projIdx, "projects")} placeholder="E-Commerce Offline Engine" className="form-input"
              />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">Start Mon-Year</label>
              <input
                type="text" name="projStart" value={proj.projStart || ""}
                onChange={(e) => onInputChange(e, projIdx, "projects")} placeholder="Jan-2026" className="form-input"
              />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">Completed Mon-Year</label>
              <input
                type="text" name="projEnd" value={proj.projEnd || ""}
                onChange={(e) => onInputChange(e, projIdx, "projects")} placeholder="Aug-2026" className="form-input"
              />
            </div>
            <div className="input-group" style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
              <label className="input-label">Project Summary</label>
              <textarea
                name="summary" value={proj.summary || ""}
                onChange={(e) => onInputChange(e, projIdx, "projects")} rows="3" placeholder="Brief overview of what the project accomplished..." className="form-textarea"
              />
            </div>
          </div>

          {/* PROJECT DESCRIPTION BULLET ARRAYS */}
          <div style={{ marginTop: "18px", paddingLeft: "10px", borderLeft: "2px solid #1e293b" }}>
            <label className="input-label" style={{ marginBottom: "8px", display: "block" }}>Description Lines (List items)</label>

            {(proj.highlights || [""]).map((bullet, bulletIdx) => (
              <div key={bulletIdx} style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
                <span style={{ color: "#475569", fontSize: "14px" }}>•</span>
                <input
                  type="text" value={bullet}
                  onChange={(e) => onInputChange(e, projIdx, "projects", bulletIdx)}
                  placeholder="Built custom zero-dependency local storage router mechanism..." className="form-input"
                />
                {proj.highlights.length > 1 && (
                  <button
                    type="button" onClick={() => onRemoveHighlight(projIdx, bulletIdx)}
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button" onClick={() => onAddHighlight(projIdx)}
              style={{ marginTop: "10px", padding: "4px 8px", background: "#0f172a", color: "#94a3b8", border: "1px dashed #334155", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
            >
              + Add Description Line
            </button>
          </div>

        </div>
      ))}

      <button
        type="button" onClick={() => onAddItem("projects", emptyProj)}
        style={{ padding: "8px 12px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", alignSelf: "start" }}
      >
        + Add Another Project
      </button>
    </div>
  );
}
