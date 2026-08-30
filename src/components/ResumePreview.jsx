import React from "react";
import PreviewHeader from "./preview/PreviewHeader";
import PreviewExperience from "./preview/PreviewExperience";
import PreviewProjects from "./preview/PreviewProjects";
import PreviewEducation from "./preview/PreviewEducation";
import PreviewReferences from "./preview/PreviewReferences";

export default function ResumePreview({ resumeData }) {
  return (
    <div className="preview-panel">
      <div className="a4-page">

        {/* 1. Core Header Details & Social Links */}
        <PreviewHeader resumeData={resumeData} />

        {/* 2. Professional Profile Summary Block */}
        {resumeData.summary && (
          <div>
            <h4 className="resume-section-title">Summary</h4>
            <p className="resume-text">{resumeData.summary}</p>
          </div>
        )}

        {/* 3. CORE COMPETENCIES INLINE LIST (Sits precisely after Summary) */}
        {(resumeData.competencies || []).some(c => c.name) && (
          <div style={{ marginTop: "-8px" }}>
            <h4 className="resume-section-title">Core Competencies</h4>
            <p className="resume-text" style={{ fontWeight: "500", fontSize: "12.5px", color: "#1e293b", lineHeight: "1.6" }}>
              {resumeData.competencies
                .map(c => c.name)
                .filter(Boolean)
                .join("  •  ")}
            </p>
          </div>
        )}

        {/* 4. Work History Position Item Listings */}
        <PreviewExperience resumeData={resumeData} />

        {/* 5. Technical Projects Layer with Custom Date Formatting */}
        <PreviewProjects resumeData={resumeData} />

        {/* 6. Academic Backgrounds & Extra Certifications */}
        <PreviewEducation resumeData={resumeData} />

        {/* 7. Skills Inventory Arrays & References Grid */}
        <PreviewReferences resumeData={resumeData} />

        {/* 👈 NEW BRANDING BADGE (SITS AT THE ABSOLUTE FOOTER) */}
        {resumeData.showBranding !== false && (
          <div style={{
            marginTop: "auto", // Automatically pushes text to the bottom of the last page
            paddingTop: "24px",
            textAlign: "center",
            fontSize: "11px",
            color: "#94a3b8",
            fontStyle: "italic",
            fontFamily: '-apple-system, sans-serif'
          }}>
            This resume is built using PrivyResume!
          </div>
        )}


      </div>
    </div>
  );
}
