import React from "react";
import PreviewAwards from "./PreviewAwards";
import PreviewHeader from "./PreviewHeader";
import PreviewCompetencies from "./PreviewCompetencies";
import PreviewSkills from "./PreviewSkills";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewReferences from "./PreviewReferences";

export default function ModernLayout({ resumeData }) {
  return (
    <>
      {/* 🔒 ROW 1: Sits at the absolute top of the page stretching 100% width across the grid */}
      {/* <PreviewHeader resumeData={resumeData} /> */}

      {/* 🔒 ROW 2: The inner side-by-side column track wrapper container */}
      <div className="layout-modern-columns-wrapper">

        {/* 📊 LEFT NARROW TRACK COLUMN */}
        <div className="layout-modern-left-col">
          <PreviewCompetencies resumeData={resumeData} isModern={true} />
          <PreviewSkills resumeData={resumeData} isModern={true} />
          <PreviewReferences resumeData={resumeData} />
        </div>

        {/* 📊 RIGHT WIDER FOCUS TRACK COLUMN */}
        <div className="layout-modern-right-col">
          {resumeData.summary && (
            <div>
              <h4 className="resume-section-title">Summary</h4>
              <p className="resume-text" style={{ fontSize: "12.5px" }}>{resumeData.summary}</p>
            </div>
          )}

          <PreviewExperience resumeData={resumeData} />
          <PreviewProjects resumeData={resumeData} />
          <PreviewEducation resumeData={resumeData} />
          <PreviewAwards resumeData={resumeData} />
        </div>

      </div>
    </>
  );
}
