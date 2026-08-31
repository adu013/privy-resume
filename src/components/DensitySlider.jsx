import React from "react";

export default function DensitySliders({ resumeData, onInputChange }) {
  const fontSize = resumeData.selectedFontSize || 13;
  const lineHeight = resumeData.selectedLineHeight || 1.5;
  const sectionMargin = resumeData.selectedSectionMargin || 12;

  const handleSliderChange = (name, value) => {
    onInputChange({ target: { name, value: parseFloat(value) } });
  };

  return (
    <div style={{
      marginTop: "16px",
      padding: "16px",
      backgroundColor: "#0b1329",
      borderRadius: "8px",
      border: "1px solid #1e293b",
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }}>
      <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Page-Density Layout Controllers
      </label>

      {/* 1. Font Size Control Slider */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#cbd5e1" }}>
          <span>Text Size</span>
          <span style={{ fontWeight: "600", color: "#a855f7" }}>{fontSize}px</span>
        </div>
        <input type="range" min="11" max="15" step="0.5" value={fontSize} onChange={(e) => handleSliderChange("selectedFontSize", e.target.value)} style={{ width: "100%", accentColor: "#9333ea", cursor: "pointer" }} />
      </div>

      {/* 2. Line Height Tracking Slider */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#cbd5e1" }}>
          <span>Line Spacing</span>
          <span style={{ fontWeight: "600", color: "#a855f7" }}>{lineHeight}</span>
        </div>
        <input type="range" min="1.2" max="1.8" step="0.05" value={lineHeight} onChange={(e) => handleSliderChange("selectedLineHeight", e.target.value)} style={{ width: "100%", accentColor: "#9333ea", cursor: "pointer" }} />
      </div>

      {/* 3. Section Margins Spacer Slider */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#cbd5e1" }}>
          <span>Section Gaps</span>
          <span style={{ fontWeight: "600", color: "#a855f7" }}>{sectionMargin}px</span>
        </div>
        <input type="range" min="6" max="24" step="2" value={sectionMargin} onChange={(e) => handleSliderChange("selectedSectionMargin", e.target.value)} style={{ width: "100%", accentColor: "#9333ea", cursor: "pointer" }} />
      </div>
    </div>
  );
}
