import React from "react";

export default function ColorPicker({ resumeData, onInputChange }) {
  const currentColor = resumeData.headlineColor || "#4f46e5";

  // Corporate Theme Color Presets
  const colorPresets = [
    { hex: "#4f46e5", label: "Indigo Tech" },
    { hex: "#1e3a8a", label: "Slate Corporate" },
    { hex: "#065f46", label: "Modern Engineering" },
    { hex: "#334155", label: "Executive Charcoal" },
    { hex: "#6b21a8", label: "Creative Startup" },
    { hex: "#0f172a", label: "Absolute Minimalist" }
  ];

  const handleColorChange = (hexValue) => {
    onInputChange({ target: { name: "headlineColor", value: hexValue } });
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
      gap: "12px"
    }}>
      <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Accent Branding Color
      </label>

      {/* Row: Clickable Swatch Circles */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        {colorPresets.map((preset) => (
          <button
            key={preset.hex}
            type="button"
            title={preset.label}
            onClick={() => handleColorChange(preset.hex)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: preset.hex,
              border: currentColor.toLowerCase() === preset.hex.toLowerCase() ? "3px solid #ffffff" : "1px solid #1e293b",
              boxShadow: currentColor.toLowerCase() === preset.hex.toLowerCase() ? "0 0 0 2px #9333ea" : "none",
              cursor: "pointer",
              transform: currentColor.toLowerCase() === preset.hex.toLowerCase() ? "scale(1.1)" : "scale(1)",
              transition: "all 0.15s ease"
            }}
          />
        ))}

        {/* Custom Native Color Wheel Picker Frame */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginLeft: "auto",
          paddingLeft: "8px",
          borderLeft: "1px solid #1e293b"
        }}>
          <input
            type="color"
            name="headlineColor"
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            style={{
              width: "30px",
              height: "30px",
              padding: "0",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "transparent",
              cursor: "pointer"
            }}
          />
          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#64748b" }}>
            {currentColor.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
