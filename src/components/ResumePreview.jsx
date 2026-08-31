import React from "react";
import PreviewHeader from "./preview/PreviewHeader";
import PreviewBranding from "./preview/PreviewBranding";
import ClassicLayout from "./preview/ClassicLayout"; // 👈 Imported separately
import ModernLayout from "./preview/ModernLayout";   // 👈 Imported separately

export default function ResumePreview({ resumeData }) {
  const activeColor = resumeData.headlineColor || "#4f46e5";
  const currentLayout = resumeData.selectedLayout || "classic";
  const currentFont = resumeData.selectedFont || "sans";
  const fontFamilies = {
    sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace'
  };

  return (
    <div
      className="preview-panel"
      style={{
        "--accent-color": activeColor,
        "--resume-font": fontFamilies[currentFont]
      }}
    >
      <div className={`a4-page layout-${currentLayout}`}>


        {/* Dynamic Template Switcher */}
        {currentLayout === "classic" ? (
          <>
            <PreviewHeader resumeData={resumeData} />
            <ClassicLayout resumeData={resumeData} />
            <PreviewBranding resumeData={resumeData} isModern={currentLayout === "modern"} />

          </>
        ) : (
        <>
          <PreviewHeader resumeData={resumeData} />
          <ModernLayout resumeData={resumeData} />
          <PreviewBranding resumeData={resumeData} isModern={currentLayout === "modern"} />
        </>
        )}

      </div>
    </div>
  );
}
