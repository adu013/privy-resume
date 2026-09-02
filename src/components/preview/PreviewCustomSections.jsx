import React from "react";

export default function PreviewCustomSections({ resumeData }) {
  // Safe safeguard: return nothing if the array doesn't exist or is empty
  if (!resumeData.customSections || resumeData.customSections.length === 0) {
    return null;
  }

  return (
    <>
      {resumeData.customSections.map((section, sIdx) => {
        // Soft validation check: avoid printing empty blocks if there is no text content
        if (!section.items.some((item) => item.title || item.subtitle)) {
          return null;
        }

        return (
          <div
            key={sIdx}
            className="resume-custom-section"
            style={{ marginTop: `${resumeData.selectedSectionMargin || 12}px` }}
          >
            {/* Dynamic User-Defined Section Heading Title Header */}
            <h4
              className="resume-section-title"
              style={{
                color: resumeData.headlineColor || "#4f46e5",
                borderBottom: `1px solid ${resumeData.headlineColor || "#4f46e5"}`,
                paddingBottom: "2px",
                textTransform: "uppercase",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                marginBottom: "8px"
              }}
            >
              {section.heading}
            </h4>

            {section.items.map((item, iIdx) => (
              (item.title || item.subtitle) && (
                <div key={iIdx} style={{ marginBottom: "8px", pageBreakInside: "avoid" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "600" }}>
                    <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: "700" }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: "12px", color: "#475569", fontStyle: "italic" }}>
                      {item.subtitle}
                    </span>
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul style={{ margin: "2px 0 0 0", paddingLeft: "16px", listStyleType: "disc" }}>
                      {item.highlights.map((bullet, bIdx) => bullet && (
                        <li
                          key={bIdx}
                          className="resume-text"
                          style={{
                            fontSize: `${resumeData.selectedFontSize || 13}px`,
                            color: "#334155",
                            lineHeight: resumeData.selectedLineHeight || 1.5
                          }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </div>
        );
      })}
    </>
  );
}
