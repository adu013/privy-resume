import React from "react";

export default function SummaryForm({ resumeData, onInputChange }) {
  return (
    <div>
      <h3 className="form-section-title">2. Professional Profile</h3>
      <div className="input-group" style={{ marginTop: "14px" }}>
        <label className="input-label">Brief Bio / Summary</label>
        <textarea
          name="summary" value={resumeData.summary} onChange={onInputChange}
          rows="6" placeholder="Experienced professional..." className="form-textarea"
        />
      </div>
    </div>
  );
}
