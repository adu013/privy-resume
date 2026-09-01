import React from "react";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewSkills from "./PreviewSkills";
import PreviewReferences from "./PreviewReferences";
import PreviewAwards from "./PreviewAwards";
import PreviewCertificates from "./PreviewCertificates";
import PreviewCompetencies from "./PreviewCompetencies";

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

  // RENDERING DICTIONARY MATRIX
  const componentMap = {
    summary: resumeData.summary ? (
      <div key="summary">
        <h4 className="resume-section-title">Summary</h4>
        <p className="resume-text">{resumeData.summary}</p>
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
      {currentOrder.map(sectionId => componentMap[sectionId] || null)}
    </>
  );
}
