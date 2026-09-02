import React from "react";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewSkills from "./PreviewSkills";
import PreviewReferences from "./PreviewReferences";
import PreviewAwards from "./PreviewAwards";
import PreviewCertificates from "./PreviewCertificates";
import PreviewCompetencies from "./PreviewCompetencies";
import PreviewCustomSections from "./PreviewCustomSections"; // 📂 Clean import!

export default function ClassicLayout({ resumeData }) {
  const defaultOrder = [
    "summary",
    "competencies",
    "experience",
    "projects",
    "education",
    "skills",
    "certifications",
    "awards",
    "references"
  ];

  const currentOrder = resumeData.sectionOrder || defaultOrder;

  // RENDERING DICTIONARY MATRIX (Stores core default section blueprints)
  const componentMap = {
    summary: resumeData.summary ? (
      <div key="summary">
        <h4 className="resume-section-title" style={{ color: resumeData.headlineColor || "#4f46e5", borderBottom: `1px solid ${resumeData.headlineColor || "#4f46e5"}`, paddingBottom: "2px", textTransform: "uppercase", fontSize: "14px", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "8px" }}>Summary</h4>
        <p className="resume-text" style={{ fontSize: `${resumeData.selectedFontSize || 13}px`, lineHeight: resumeData.selectedLineHeight || 1.5, color: "#334155" }}>{resumeData.summary}</p>
      </div>
    ) : null,
    competencies: <PreviewCompetencies key="competencies" resumeData={resumeData} isModern={false} />,
    experience: <PreviewExperience key="experience" resumeData={resumeData} />,
    projects: <PreviewProjects key="projects" resumeData={resumeData} />,
    education: <PreviewEducation key="education" resumeData={resumeData} />,
    skills: <PreviewSkills key="skills" resumeData={resumeData} isModern={false} />,
    certifications: <PreviewCertificates key="certificates" resumeData={resumeData} />,
    awards: <PreviewAwards key="awards" resumeData={resumeData} />,
    references: <PreviewReferences key="references" resumeData={resumeData} />,
  };

  return (
    <>
      {currentOrder.map(sectionId => {
        // PATH A: If it's a default structural key, return its mapped component immediately
        if (componentMap[sectionId]) {
          return componentMap[sectionId];
        }

        // PATH B: If it's a dynamic user-generated title string, target-lock and render that specific block
        const matchedCustomSection = resumeData.customSections?.find(
          (sec) => sec.heading === sectionId
        );

        if (matchedCustomSection) {
          // Wrap the isolated slice data in a miniature blueprint container format for the sub-component
          const isolatedPayload = {
            ...resumeData,
            customSections: [matchedCustomSection]
          };

          return (
            <PreviewCustomSections
              key={sectionId}
              resumeData={isolatedPayload}
            />
          );
        }

        return null;
      })}
    </>
  );
}
