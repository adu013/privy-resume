import React from "react";
import PreviewAwards from "./PreviewAwards";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewCompetencies from "./PreviewCompetencies";
import PreviewSkills from "./PreviewSkills";
import PreviewReferences from "./PreviewReferences";

export default function ClassicLayout({ resumeData }) {
  return (
    <>
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
      <PreviewAwards resumeData={resumeData} />
      <PreviewSkills resumeData={resumeData} isModern={false} />
      <PreviewReferences resumeData={resumeData} />
    </>
  );
}
