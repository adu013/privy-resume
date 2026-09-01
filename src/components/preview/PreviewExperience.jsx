import React from "react";

export default function PreviewExperience({ resumeData }) {
  const jobsList = resumeData.jobs || [];
  if (!jobsList.some(j => j.company || j.jobTitle)) return null;

  return (
    <div>
      <h4 className="resume-section-title">Work Experiences</h4>
      {jobsList.map((job, idx) => (
        (job.company || job.jobTitle) && (
          <div key={idx} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <strong style={{ fontSize: "14px", color: "#0f172a" }}>{job.jobTitle}</strong>
                <div className="resume-text" style={{ fontStyle: "italic", marginTop: "2px" }}>
                  {job.company}{job.country && `, ${job.country}`}
                </div>
              </div>
              {(job.jobStart || job.jobEnd) && (
                <div style={{ fontSize: "12px", color: "#475569", fontWeight: "500" }}>
                  {job.jobStart} — {job.jobEnd || "Present"}
                </div>
              )}
            </div>
            {job.highlights && job.highlights.length > 0 && (
              <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px", listStyleType: "disc" }}>
                {job.highlights.map((bullet, bIdx) => bullet && <li key={bIdx} className="resume-text" style={{ fontSize: "12.5px" }}>{bullet}</li>)}
              </ul>
            )}
          </div>
        )
      ))}
    </div>
  );
}
