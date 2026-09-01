import React from "react";

export default function ExperienceForm({
  resumeData,
  onInputChange,
  onAddItem,
  onRemoveItem,
  onAddHighlight,
  onRemoveHighlight
}) {
  const emptyJob = {
    company: "", country: "", jobTitle: "", jobStart: "", jobEnd: "", highlights: [""]
  };

  const jobsList = resumeData.jobs || [emptyJob];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3 className="form-section-title">3. Employment History</h3>

      {jobsList.map((job, jobIdx) => (
        <div key={jobIdx} style={{ borderBottom: "1px dashed #334155", paddingBottom: "24px", marginBottom: "12px" }}>

          <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#a855f7" }}>
              Company Position #{jobIdx + 1}
            </span>
            {jobsList.length > 1 && (
              <button
                type="button" onClick={() => onRemoveItem("jobs", jobIdx)}
                style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Remove Company
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Company Name</label>
              <input
                type="text" name="company" value={job.company || ""}
                onChange={(e) => onInputChange(e, jobIdx, "jobs")} placeholder="Google Inc." className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Country</label>
              <input
                type="text" name="country" value={job.country || ""}
                onChange={(e) => onInputChange(e, jobIdx, "jobs")} placeholder="United States" className="form-input"
              />
            </div>
            <div className="input-group" style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
              <label className="input-label">Company Website URL</label>
              <input
                type="url"
                name="companyLink"
                value={job.companyLink || ""}
                onChange={(e) => onInputChange(e, jobIdx, "jobs")}
                placeholder="https://company.com"
                className="form-input"
              />
            </div>
            <div className="input-group" style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
              <label className="input-label">Job Title</label>
              <input
                type="text" name="jobTitle" value={job.jobTitle || ""}
                onChange={(e) => onInputChange(e, jobIdx, "jobs")} placeholder="Senior Systems Architect" className="form-input"
              />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">Start Mon-Year</label>
              <input
                type="text" name="jobStart" value={job.jobStart || ""}
                onChange={(e) => onInputChange(e, jobIdx, "jobs")} placeholder="Jan-2022" className="form-input"
              />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
              <label className="input-label">End Mon-Year</label>
              <input
                type="text" name="jobEnd" value={job.jobEnd || ""}
                onChange={(e) => onInputChange(e, jobIdx, "jobs")} placeholder="Present" className="form-input"
              />
            </div>
          </div>

          {/* INNER NESTED DESCRIPTION HIGHLIGHT BULLETS SECTION */}
          <div style={{ marginTop: "18px", paddingLeft: "10px", borderLeft: "2px solid #1e293b" }}>
            <label className="input-label" style={{ marginBottom: "8px", display: "block" }}>
              Description Lines (List items)
            </label>

            {(job.highlights || [""]).map((bullet, bulletIdx) => (
              <div key={bulletIdx} style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
                <span style={{ color: "#475569", fontSize: "14px" }}>•</span>
                <input
                  type="text" value={bullet}
                  onChange={(e) => onInputChange(e, jobIdx, "jobs", bulletIdx)}
                  placeholder="Led local development deployment workflows..."
                  className="form-input"
                />
                {job.highlights.length > 1 && (
                  <button
                    type="button" onClick={() => onRemoveHighlight(jobIdx, bulletIdx)}
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px", padding: "0 4px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button" onClick={() => onAddHighlight(jobIdx)}
              style={{ marginTop: "10px", padding: "4px 8px", background: "#0f172a", color: "#94a3b8", border: "1px dashed #334155", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
            >
              + Add Description Line
            </button>
          </div>

        </div>
      ))}

      <button
        type="button" onClick={() => onAddItem("jobs", emptyJob)}
        style={{ padding: "8px 12px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", alignSelf: "start" }}
      >
        + Add Another Company
      </button>
    </div>
  );
}
