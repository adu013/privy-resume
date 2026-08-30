import React from "react";
import PreviewHeader from "./PreviewHeader";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewCompetencies from "./PreviewCompetencies"; // 👈 Integrated
import PreviewSkills from "./PreviewSkills";             // 👈 Integrated
import PreviewReferences from "./PreviewReferences";     // 👈 Integrated

export function ClassicLayout({ resumeData }) {
  return (
    <>
      {/* 📊 CLASSIC: Full width sequential layout stream */}
      {/* <PreviewHeader resumeData={resumeData} /> */}

      {resumeData.summary && (
        <div>
          <h4 className="resume-section-title">Summary</h4>
          <p className="resume-text">{resumeData.summary}</p>
        </div>
      )}

      <PreviewCompetencies resumeData={resumeData} isModern={false} />
      <PreviewExperience resumeData={resumeData} />
      <PreviewProjects resumeData={resumeData} />
      <PreviewEducation resumeData={resumeData} />
      <PreviewSkills resumeData={resumeData} Brass={false} />
      <PreviewReferences resumeData={resumeData} />
    </>
  );
}

export function ModernLayout({ resumeData }) {
  return (
    <>
      {/* 📊 LEFT NARROW COLUMN SIDEBAR (Competencies, Skills, Education) */}
      <div className="layout-modern-left-col">
        <PreviewCompetencies resumeData={resumeData} isModern={true} />
        <PreviewSkills resumeData={resumeData} isModern={true} />
        <PreviewEducation resumeData={resumeData} />
      </div>

      {/* 📊 RIGHT WIDER COLUMN MAIN TRACK (Identity, Summary, Experiences, Projects, References) */}
      <div className="layout-modern-right-col">
        {/* <div style={{ marginBottom: "12px" }}>
          <PreviewHeader resumeData={resumeData} />
        </div> */}

        {resumeData.summary && (
          <div>
            <h4 className="resume-section-title">Summary</h4>
            <p className="resume-text" style={{ fontSize: "12.5px" }}>{resumeData.summary}</p>
          </div>
        )}

        <PreviewExperience resumeData={resumeData} />
        <PreviewProjects resumeData={resumeData} />
        <PreviewReferences resumeData={resumeData} />
      </div>
    </>
  );
}
