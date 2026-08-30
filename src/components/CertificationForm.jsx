import React from "react";

export default function CertificationForm({ resumeData, onInputChange, onAddItem, onRemoveItem }) {
  const emptyCert = { certName: "", certInstitute: "", certDate: "" };

  // Crash-proof guard: if cache is empty or corrupted, fall back to a safe array
  const certsList = resumeData.certifications || [emptyCert];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">5. Professional Certifications</h3>

      {certsList.map((cert, index) => (
        <div key={index} style={{ borderBottom: "1px dashed #334155", paddingBottom: "20px", marginBottom: "10px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#a855f7" }}>
              Certification #{index + 1}
            </span>
            {/* Safe length check using guarded certsList variable */}
            {certsList.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveItem("certifications", index)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Remove
              </button>
            )}
          </div>

          <div className="form-grid" style={{ marginTop: "10px" }}>
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label className="input-label">Name of Certification</label>
              <input
                type="text" name="certName" value={cert.certName || ""}
                onChange={(e) => onInputChange(e, index, "certifications")} placeholder="AWS Cloud Practitioner" className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Institute</label>
              <input
                type="text" name="certInstitute" value={cert.certInstitute || ""}
                onChange={(e) => onInputChange(e, index, "certifications")} placeholder="Amazon Web Services" className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Mon-Year of Completion</label>
              <input
                type="text" name="certDate" value={cert.certDate || ""}
                onChange={(e) => onInputChange(e, index, "certifications")} placeholder="Jan-2025" className="form-input"
              />
            </div>
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={() => onAddItem("certifications", emptyCert)}
        style={{ padding: "8px 12px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", alignSelf: "start" }}
      >
        + Add Another Certification
      </button>
    </div>
  );
}
