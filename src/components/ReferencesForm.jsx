import React from "react";

export default function ReferencesForm({ resumeData, onInputChange, onAddItem, onRemoveItem }) {
  const emptyRef = { name: "", title: "", company: "", contact: "" };
  const refList = resumeData.references || [emptyRef];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">9. Professional References</h3>

      {refList.map((ref, idx) => (
        <div key={idx} style={{ borderBottom: "1px dashed #334155", paddingBottom: "20px", marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#a855f7" }}>Reference #{idx + 1}</span>
            {refList.length > 1 && (
              <button
                type="button" onClick={() => onRemoveItem("references", idx)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Remove
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Reference Name</label>
              <input type="text" name="name" value={ref.name || ""} onChange={(e) => onInputChange(e, idx, "references")} placeholder="Jane Smith" className="form-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Job Title</label>
              <input type="text" name="title" value={ref.title || ""} onChange={(e) => onInputChange(e, idx, "references")} placeholder="Director of Engineering" className="form-input" />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">Company</label>
              <input type="text" name="company" value={ref.company || ""} onChange={(e) => onInputChange(e, idx, "references")} placeholder="Netflix" className="form-input" />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">Contact Info (Email/Phone)</label>
              <input type="text" name="contact" value={ref.contact || ""} onChange={(e) => onInputChange(e, idx, "references")} placeholder="janesmith@email.com" className="form-input" />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button" onClick={() => onAddItem("references", emptyRef)}
        style={{ padding: "8px 12px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", alignSelf: "start" }}
      >
        + Add Reference
      </button>
    </div>
  );
}
