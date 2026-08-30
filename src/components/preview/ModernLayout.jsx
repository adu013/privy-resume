import React from "react";
import PreviewCompetencies from "./PreviewCompetencies";
import PreviewSkills from "./PreviewSkills";
import PreviewExperience from "./PreviewExperience";
import PreviewProjects from "./PreviewProjects";
import PreviewEducation from "./PreviewEducation";
import PreviewReferences from "./PreviewReferences"; // Already imported

export default function ModernLayout({ resumeData }) {
  return (
    <div className="layout-modern-columns-wrapper">

      {/* 📊 LEFT NARROW TRACK COLUMN */}
      <div className="layout-modern-left-col">
        <PreviewCompetencies resumeData={resumeData} isModern={true} />
        <PreviewSkills resumeData={resumeData} isModern={true} />

        {/* 👈 FIXED: References now mounts cleanly at the bottom of the left sidebar */}
        <PreviewReferences resumeData={resumeData} />
      </div>

      {/* 📊 RIGHT WIDER FOCUS TRACK COLUMN */}
      <div className="layout-modern-right-col">

        {/* Executive Profile Summary */}
        {resumeData.summary && (
          <div>
            <h4 className="resume-section-title">Summary</h4>
            <p className="resume-text" style={{ fontSize: "12.5px" }}>{resumeData.summary}</p>
          </div>
        )}

        {/* Professional Work History Positions */}
        <PreviewExperience resumeData={resumeData} />

        {/* Engineering Projects Layer */}
        <PreviewProjects resumeData={resumeData} />

        {/* Engineering Education Layer */}
        <PreviewEducation resumeData={resumeData} />

      </div>

    </div>
  );
}
