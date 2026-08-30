import React from "react";

export default function LayoutSwitcher({ resumeData, onInputChange }) {
  const currentLayout = resumeData.selectedLayout || "classic";

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
        Select Resume Template Design
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {/* Classic Button Option */}
        <button
          type="button"
          onClick={() => onInputChange({ target: { name: "selectedLayout", value: "classic" } })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            border: "1px solid",
            backgroundColor: currentLayout === "classic" ? "#9333ea" : "#070d19",
            color: "white",
            borderColor: currentLayout === "classic" ? "#9333ea" : "#1e293b"
          }}
        >
          📄 Classic (1 Column)
        </button>

        {/* Modern Split Button Option */}
        <button
          type="button"
          onClick={() => onInputChange({ target: { name: "selectedLayout", value: "modern" } })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            border: "1px solid",
            backgroundColor: currentLayout === "modern" ? "#9333ea" : "#070d19",
            color: "white",
            borderColor: currentLayout === "modern" ? "#9333ea" : "#1e293b"
          }}
        >
          📊 Modern Split (2 Columns)
        </button>
      </div>
    </div>
  );
}
