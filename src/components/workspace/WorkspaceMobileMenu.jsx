import React from "react";

export default function WorkspaceMobileMenu({
  setIsMenuOpen,
  onLoadDemoProfile,
  onExportJSON,
  onImportJSON,
  onShareDeepLink,
  onClearForm,
  onBack
}) {

  // Safely encapsulate click captures to absorb double-bubble event loops
  const handleActionClick = (e, actionCallback) => {
    e.stopPropagation();
    actionCallback(e);
    setIsMenuOpen(false);
  };

  return (
    <div
      className="mobile-actions-dropdown-overlay"
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: "70px",
        right: "24px",
        width: "240px",
        backgroundColor: "#0b1329",
        border: "1px solid #1e293b",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
        zIndex: 100
      }}
    >
      {/* CLOSE ANCHOR AT THE TOP BLOCK */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(false);
        }}
        style={{
          padding: "6px 10px",
          backgroundColor: "#1e293b",
          color: "#f87171", // Soft red tint
          border: "1px solid #ef4444",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: "700",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "4px" // Generous breathing room space before actions list
        }}
      >
        ✕ Close Menu
      </button>

      <button
        onClick={(e) => handleActionClick(e, onLoadDemoProfile)}
        style={{ padding: "8px 12px", backgroundColor: "#1e1b4b", color: "#a5b4fc", border: "1px solid #4338ca", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "700", textAlign: "left" }}
      >
        ✨ Load Demo Profile
      </button>

      <button
        onClick={(e) => handleActionClick(e, onExportJSON)}
        style={{ padding: "8px 12px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", textAlign: "left" }}
      >
        📥 Export Data (.json)
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          document.getElementById("mobile-file-uploader-node").click();
        }}
        style={{ padding: "8px 12px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", textAlign: "left" }}
      >
        📤 Import Data
        <input
          type="file"
          id="mobile-file-uploader-node"
          accept=".json"
          onChange={(e) => {
            onImportJSON(e);
            setIsMenuOpen(false);
          }}
          style={{ display: "none" }}
        />
      </button>

      <button
        onClick={(e) => handleActionClick(e, () => window.print())}
        style={{ padding: "8px 12px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "12px", textAlign: "left" }}
      >
        🖨️ Download PDF / Print
      </button>

      <button
        onClick={(e) => handleActionClick(e, onShareDeepLink)}
        style={{ padding: "8px 12px", backgroundColor: "#065f46", color: "#a7f3d0", border: "1px solid #047857", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", textAlign: "left" }}
      >
        🔗 Share Link
      </button>

      <button
        className="btn-danger"
        onClick={(e) => handleActionClick(e, onClearForm)}
        style={{ padding: "8px 12px", fontSize: "12px", textAlign: "left", width: "100%" }}
      >
        ↺ Reset Data
      </button>

      <button
        className="btn-secondary"
        onClick={(e) => handleActionClick(e, onBack)}
        style={{ padding: "8px 12px", fontSize: "12px", textAlign: "left", width: "100%" }}
      >
        ← Exit
      </button>
    </div>
  );
}
