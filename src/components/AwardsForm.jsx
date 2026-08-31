import React from "react";

export default function AwardsForm({ resumeData, onInputChange, onAddItem, onRemoveItem }) {
  const awards = resumeData.awards || [];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...awards];
    updated[index][name] = value;
    onInputChange({ target: { name: "awards", value: updated } });
  };

  return (
    <div>
      <h3 className="form-section-title">11. Awards & Achievements</h3>

      {awards.map((award, index) => (
        <div key={index} style={{ marginBottom: "20px", padding: "16px", backgroundColor: "#0b1329", borderRadius: "8px", border: "1px solid #1e293b", position: "relative" }}>

          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Award Title</label>
              <input type="text" name="title" value={award.title || ""} onChange={(e) => handleChange(index, e)} placeholder="Employee of the Year" className="form-input" />
            </div>
            <div className="input-group">
              <label className="input-label">Issuer / Company</label>
              <input type="text" name="issuer" value={award.issuer || ""} onChange={(e) => handleChange(index, e)} placeholder="Google Inc." className="form-input" />
            </div>
          </div>

          <div className="form-grid" style={{ marginTop: "12px" }}>
            <div className="input-group">
              <label className="input-label">Date Earned</label>
              <input type="text" name="date" value={award.date || ""} onChange={(e) => handleChange(index, e)} placeholder="Dec 2025" className="form-input" />
            </div>
          </div>

          <div className="input-group" style={{ marginTop: "12px" }}>
            <label className="input-label">Brief Description</label>
            <textarea name="summary" value={award.summary || ""} onChange={(e) => handleChange(index, e)} placeholder="Recognized out of 500+ engineers for driving core system reliability." className="form-textarea" />
          </div>

          {awards.length > 1 && (
            <button type="button" onClick={() => onRemoveItem("awards", index)} className="btn-danger" style={{ marginTop: "12px" }}>
              ✕ Remove Award
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={() => onAddItem("awards", { title: "", issuer: "", date: "", summary: "" })} className="btn-secondary" style={{ width: "100%", padding: "10px" }}>
        + Add New Award / Achievement
      </button>
    </div>
  );
}
