import React from "react";

export default function PreviewBranding({ resumeData }) {
  // If the user explicitly unchecked the visibility toggle, do not render anything
  if (resumeData.showBranding === false) return null;

  return (
    <div
      style={{
        width: "100%",
        display: "block",
        marginTop: "auto",
        paddingTop: "16px",
        borderTop: "1px dashed #cbd5e1",
        textAlign: "center",
        fontSize: "11px",
        color: "#94a3b8",
        fontStyle: "italic",
        fontFamily: '-apple-system, sans-serif'
      }}
    >
      This resume is built using PrivyResume!
    </div>
  );
}
