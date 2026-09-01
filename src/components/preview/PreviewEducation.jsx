import React from "react";

export default function PreviewEducation({ resumeData }) {
  const degreesList = resumeData.degrees || [];
  const certsList = resumeData.certifications || [];

  const hasEdu = degreesList.some(d => d.collegeName || d.degree);
  const hasCerts = certsList.some(c => c.certName || c.certInstitute);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Academic Degrees block */}
      {hasEdu && (
        <div>
          <h4 className="resume-section-title">Education</h4>
          {degreesList.map((edu, idx) => (
            (edu.collegeName || edu.degree) && (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "6px" }}>
                <div>
                  <strong style={{ fontSize: "14px", color: "#0f172a" }}>{edu.collegeName}</strong>
                  <div className="resume-text" style={{ fontStyle: "italic", marginTop: "1px" }}>
                    {edu.degree} {edu.specialization && ` in ${edu.specialization}`}
                  </div>
                </div>
                {(edu.eduStart || edu.eduEnd) && <div style={{ fontSize: "12px", color: "#475569", fontWeight: "500" }}>{edu.eduStart} — {edu.eduEnd || "Present"}</div>}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
