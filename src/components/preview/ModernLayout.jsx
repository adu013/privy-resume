import React from "react";
import PreviewCompetencies from "./PreviewCompetencies";
import PreviewSkills from "./PreviewSkills";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewReferences from "./PreviewReferences";
import PreviewAwards from "./PreviewAwards";
import PreviewCertificates from "./PreviewCertificates";

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
        <h4 className="resume-section-title">Summary</h4>
        <p className="resume-text" style={{ fontSize: "12.5px" }}>{resumeData.summary}</p>
      </div>
    ) : null,
    experience: <PreviewExperience key="experience" resumeData={resumeData} />,
    projects: <PreviewProjects key="projects" resumeData={resumeData} />,
    education: <PreviewEducation key="education" resumeData={resumeData} />,
    certifications: <PreviewCertificates key="certifications" resumeData={resumeData} />,
    awards: <PreviewAwards key="awards" resumeData={resumeData} />
  };

  return (
    <div className="layout-modern-columns-wrapper">

      {/* LEFT NARROW TRACK COLUMN (Skills, Certs, References, Competencies) */}
      <div className="layout-modern-left-col">
        {currentOrder.map(id => leftComponents[id] || null)}
      </div>

      {/* RIGHT WIDER FOCUS TRACK COLUMN (Summary, History, Projects, Education) */}
      <div className="layout-modern-right-col">
        {currentOrder.map(id => rightComponents[id] || null)}
      </div>

    </div>
  );
}
