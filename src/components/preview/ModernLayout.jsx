import React from "react";
import PreviewCompetencies from "./PreviewCompetencies";
import PreviewSkills from "./PreviewSkills";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewReferences from "./PreviewReferences";
import PreviewAwards from "./PreviewAwards";
import PreviewCertificates from "./PreviewCertificates";
import PreviewCustomSections from "./PreviewCustomSections"; // 📂 Clean import!

export default function ModernLayout({ resumeData }) {
  // Default ordering
  const defaultOrder = ["summary", "competencies", "experience", "projects", "education", "skills", "certifications", "awards", "references"];
  const currentOrder = resumeData.sectionOrder || defaultOrder;

  // LEFT NARROW SIDEBAR COL DICTIONARY MODULES
  const leftComponents = {
    competencies: <PreviewCompetencies key="competencies" resumeData={resumeData} isModern={true} />,
    skills: <PreviewSkills key="skills" resumeData={resumeData} isModern={true} />,
    references: <PreviewReferences key="references" resumeData={resumeData} />
  };

  // 🔒 RIGHT MAIN FOCUS COL DICTIONARY MODULES
  const rightComponents = {
    summary: resumeData.summary ? (
      <div key="summary" style={{ marginBottom: "12px" }}>
        <h4 className="resume-section-title" style={{ color: resumeData.headlineColor || "#4f46e5", borderBottom: `1px solid ${resumeData.headlineColor || "#4f46e5"}`, paddingBottom: "2px", textTransform: "uppercase", fontSize: "14px", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "8px" }}>Summary</h4>
        <p className="resume-text" style={{ fontSize: "12.5px", lineHeight: resumeData.selectedLineHeight || 1.5, color: "#334155" }}>{resumeData.summary}</p>
      </div>
    ) : null,
    experience: <PreviewExperience key="experience" resumeData={resumeData} />,
    projects: <PreviewProjects key="projects" resumeData={resumeData} />,
    education: <PreviewEducation key="education" resumeData={resumeData} />,
    certifications: <PreviewCertificates key="certifications" resumeData={resumeData} />,
    awards: <PreviewAwards key="awards" resumeData={resumeData} />
  };

  return (
    <div className="layout-modern-columns-wrapper" style={{ display: "flex", gap: "24px" }}>

      {/* LEFT NARROW TRACK COLUMN (Skills, Certs, References, Competencies) */}
      <div className="layout-modern-left-col" style={{ flex: "1" }}>
        {currentOrder.map(id => leftComponents[id] || null)}
      </div>

      {/* RIGHT WIDER FOCUS TRACK COLUMN (Summary, History, Projects, Education, & Movable Custom Blocks) */}
      <div className="layout-modern-right-col" style={{ flex: "2" }}>
        {currentOrder.map(id => {
          // 📁 PATH A: If it's a default structural right-column module, render it immediately [INDEX]
          if (rightComponents[id]) {
            return rightComponents[id];
          }

          // 📁 PATH B: Catch dynamic user-generated titles and render them cleanly inside the main column track [INDEX]
          const matchedCustomSection = resumeData.customSections?.find(
            (sec) => sec.heading === id
          );

          if (matchedCustomSection) {
            // Package the isolated section data structure slice safely for the sub-component [INDEX]
            const isolatedPayload = {
              ...resumeData,
              customSections: [matchedCustomSection]
            };

            return (
              <PreviewCustomSections
                key={id}
                resumeData={isolatedPayload}
              />
            );
          }

          return null;
        })}
      </div>

    </div>
  );
}
