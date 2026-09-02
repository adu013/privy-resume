import React from "react";
import ResumePreview from "../ResumePreview";

export default function WorkspacePublicPreview({ resumeData, onExitPreview }) {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#020617" }}>

      {/* Floating Portfolio Top Utility Dashboard */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 28px",
        backgroundColor: "#0b1329",
        borderBottom: "1px solid #1e293b",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
        width: "100%"
      }}>
        <div>
          <h2 style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "600", margin: 0, letterSpacing: "0.5px" }}>
            ✨ INTERACTIVE PORTFOLIO WORKSPACE
          </h2>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => window.print()}
            style={{ padding: "8px 16px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "12px" }}
          >
            🖨️ Download PDF / Print Resume
          </button>

          <button
            onClick={onExitPreview}
            style={{ padding: "8px 14px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
          >
            🛠️ Open in Full Resume Editor →
          </button>
        </div>
      </div>

      {/* Centered Widescreen Canvas Sheet Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "start", width: "100%" }}>
        <div style={{ width: "100%", maxWidth: "850px" }}>
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>

    </div>
  );
}
