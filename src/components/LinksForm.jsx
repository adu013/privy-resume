import React from "react";

export default function LinksForm({ resumeData, onInputChange, onAddItem, onRemoveItem }) {
  const emptyLink = { label: "", url: "" };
  const customLinks = resumeData.otherLinks || [emptyLink];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">8. Professional Links</h3>

      {/* FIXED CORE SOCIO CHANNELS */}
      <div className="form-grid">
        <div className="input-group">
          <label className="input-label">LinkedIn URL</label>
          <input type="text" name="linkedin" value={resumeData.linkedin || ""} onChange={onInputChange} placeholder="://linkedin.com" className="form-input" />
        </div>
        <div className="input-group">
          <label className="input-label">GitHub URL</label>
          <input type="text" name="github" value={resumeData.github || ""} onChange={onInputChange} placeholder="://github.com" className="form-input" />
        </div>
        <div className="input-group" style={{ marginTop: "10px" }}>
          <label className="input-label">GitLab URL</label>
          <input type="text" name="gitlab" value={resumeData.gitlab || ""} onChange={onInputChange} placeholder="://gitlab.com" className="form-input" />
        </div>
        <div className="input-group" style={{ marginTop: "10px" }}>
          <label className="input-label">X (Twitter) URL</label>
          <input type="text" name="xplatform" value={resumeData.xplatform || ""} onChange={onInputChange} placeholder="://x.com" className="form-input" />
        </div>
      </div>

      {/* DYNAMIC LIST FOR CUSTOM OTHER PORTFOLIOS */}
      <div style={{ borderTop: "1px solid #1e293b", paddingTop: "16px" }}>
        <label className="input-label" style={{ marginBottom: "12px", display: "block" }}>Custom / Other Portfolios</label>

        {customLinks.map((link, idx) => (
          <div key={idx} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
            <input
              type="text" name="label" value={link.label || ""}
              onChange={(e) => onInputChange(e, idx, "otherLinks")} placeholder="Portfolio or Blog" className="form-input" style={{ width: "35%" }}
            />
            <input
              type="text" name="url" value={link.url || ""}
              onChange={(e) => onInputChange(e, idx, "otherLinks")} placeholder="mywebsite.com" className="form-input" style={{ flex: 1 }}
            />
            {customLinks.length > 1 && (
              <button
                type="button" onClick={() => onRemoveItem("otherLinks", idx)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "14px" }}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button" onClick={() => onAddItem("otherLinks", emptyLink)}
          style={{ padding: "4px 8px", background: "#0f172a", color: "#94a3b8", border: "1px dashed #334155", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
        >
          + Add Custom Link
        </button>
      </div>
    </div>
  );
}
