import React from "react";

export default function PreviewCertificates({ resumeData }) {
  const certsList = resumeData.certifications || [];

  // Safe layout check: If there are no certificate names entered, completely hide the section
  if (!certsList.some(cert => cert && cert.certName)) return null;

  return (
    <div style={{ marginTop: "12px", pageBreakInside: "avoid", breakInside: "avoid" }}>
      <h4 className="resume-section-title">Certifications</h4>

      {certsList.map((cert, idx) => (
        cert && cert.certName && (
          <div key={idx} style={{ marginBottom: "8px", pageBreakInside: "avoid", breakInside: "avoid" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                {cert.certName}
                {cert.certInstitute && (
                  <span style={{ fontWeight: "normal", color: "#475569" }}>
                    {" "}| {cert.certInstitute}
                  </span>
                )}
              </strong>
              {cert.certDate && (
                <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: "600" }}>
                  {cert.certDate}
                </span>
              )}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
