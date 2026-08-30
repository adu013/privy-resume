import React from "react";

export default function ColorPicker({ resumeData, onInputChange }) {
  const currentColor = resumeData.headlineColor || "#4f46e5";

  return (
    <div style={{
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px",
      backgroundColor: "#0f172a",
      borderRadius: "8px",
      border: "1px solid #1e293b"
    }}>
      <label htmlFor="headlineColor" style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>
        CHOOSE RESUME ACCENT COLOR
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>
          {currentColor}
        </span>
        <input
          type="color"
          id="headlineColor"
          name="headlineColor"
          value={currentColor}
          onChange={onInputChange}
          style={{
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor: "transparent"
          }}
        />
      </div>
    </div>
  );
}
