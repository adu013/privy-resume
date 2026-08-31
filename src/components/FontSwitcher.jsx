import React from "react";

export default function FontSwitcher({ resumeData, onInputChange }) {
  const currentFont = resumeData.selectedFont || "sans";

  const fontOptions = [
    { id: "sans", label: "Modern (Sans-Serif)", sub: "Helvetica / Inter (Startup & Tech)" },
    { id: "serif", label: "Elegant (Serif)", sub: "Georgia / Times (Finance & Corporate)" },
    { id: "mono", label: "Technical (Mono)", sub: "Courier / Menlo (DevOps & Backend)" }
  ];

  return (
    <div style={{
      marginTop: "16px",
      padding: "16px",
      backgroundColor: "#0b1329",
      borderRadius: "8px",
      border: "1px solid #1e293b",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Select Document Typography Style
      </label>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {fontOptions.map((font) => (
          <button
            key={font.id}
            type="button"
            onClick={() => onInputChange({ target: { name: "selectedFont", value: font.id } })}
            style={{
              padding: "10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              border: "1px solid",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              backgroundColor: currentFont === font.id ? "#9333ea" : "#070d19",
              color: "white",
              borderColor: currentFont === font.id ? "#9333ea" : "#1e293b",
              transition: "all 0.2s ease"
            }}
          >
            <span>{font.label}</span>
            <span style={{ fontSize: "10px", fontWeight: "normal", color: currentFont === font.id ? "#f3e8ff" : "#64748b", marginTop: "2px" }}>
              {font.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
