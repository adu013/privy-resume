import React from "react";

export default function EducationForm({ resumeData, onInputChange, onAddItem, onRemoveItem }) {
  const emptyDegree = { collegeName: "", degree: "", specialization: "", eduStart: "", eduEnd: "" };

  // Crash-proof guard: if cache is empty or corrupted, fall back to a safe array
  const degreesList = resumeData.degrees || [emptyDegree];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">4. Academic Degrees</h3>

      {degreesList.map((edu, index) => (
        <div key={index} style={{ borderBottom: "1px dashed #334155", paddingBottom: "20px", marginBottom: "10px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#a855f7" }}>
              Degree #{index + 1}
            </span>
            {/* Safe length check using guarded degreesList variable */}
            {degreesList.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveItem("degrees", index)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Remove
              </button>
            )}
          </div>

          <div className="form-grid" style={{ marginTop: "10px" }}>
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label className="input-label">College / University Name</label>
              <input
                type="text" name="collegeName" value={edu.collegeName || ""}
                onChange={(e) => onInputChange(e, index, "degrees")} placeholder="Harvard University" className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Degree</label>
              <input
                type="text" name="degree" value={edu.degree || ""}
                onChange={(e) => onInputChange(e, index, "degrees")} placeholder="Bachelor of Science" className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Specialization</label>
              <input
                type="text" name="specialization" value={edu.specialization || ""}
                onChange={(e) => onInputChange(e, index, "degrees")} placeholder="Computer Science" className="form-input"
              />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">Start Mon-Year</label>
              <input
                type="text" name="eduStart" value={edu.eduStart || ""}
                onChange={(e) => onInputChange(e, index, "degrees")} placeholder="Sep-2019" className="form-input"
              />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">End Mon-Year</label>
              <input
                type="text" name="eduEnd" value={edu.eduEnd || ""}
                onChange={(e) => onInputChange(e, index, "degrees")} placeholder="May-2023" className="form-input"
              />
            </div>
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={() => onAddItem("degrees", emptyDegree)}
        style={{ padding: "8px 12px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", alignSelf: "start" }}
      >
        + Add Another Degree
      </button>
    </div>
  );
}
