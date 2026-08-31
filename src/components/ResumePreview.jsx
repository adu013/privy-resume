import React from "react";
import PreviewHeader from "./preview/PreviewHeader";
import PreviewBranding from "./preview/PreviewBranding";
import ClassicLayout from "./preview/ClassicLayout"; // 👈 Imported separately
import ModernLayout from "./preview/ModernLayout";   // 👈 Imported separately

export default function ResumePreview({ resumeData }) {
  // User section or default
  const activeColor = resumeData.headlineColor || "#4f46e5";
  const currentLayout = resumeData.selectedLayout || "classic";
  const currentFont = resumeData.selectedFont || "sans";

  const fontFamilies = {
    sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace'
  };

  // Slider Numerical Properties
  const fontSize = resumeData.selectedFontSize || 13;
  const lineHeight = resumeData.selectedLineHeight || 1.5;
  const sectionMargin = resumeData.selectedSectionMargin || 12;

  return (
    <div
      className="preview-panel"
      style={{
        "--accent-color": activeColor,                  // dynamic accent color
        "--resume-font": fontFamilies[currentFont],     // dynamic font
        "--resume-font-size": `${fontSize}px`,          // dynamic font size
        "--resume-line-height": lineHeight,             // dynamic line height
        "--resume-section-margin": `${sectionMargin}px` // dynamic section margin
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
