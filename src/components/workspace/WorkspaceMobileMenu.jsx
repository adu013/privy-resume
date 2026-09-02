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
  return (
    <div
      className="mobile-actions-dropdown-overlay"
      style={{
        position: "absolute",
        top: "70px", // Snaps cleanly underneath headers
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
      <button
        onClick={() => { onLoadDemoProfile(); setIsMenuOpen(false); }}
        style={{ padding: "8px 12px", backgroundColor: "#1e1b4b", color: "#a5b4fc", border: "1px solid #4338ca", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "700", textAlign: "left" }}
      >
        ✨ Load Demo Profile
      </button>

      <button
        onClick={() => { onExportJSON(); setIsMenuOpen(false); }}
        style={{ padding: "8px 12px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", textAlign: "left" }}
      >
        📥 Export Data (.json)
      </button>

      <label
        style={{ padding: "8px 12px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", display: "block", textAlign: "left" }}
      >
        📤 Import Data
        <input type="file" accept=".json" onChange={(e) => { onImportJSON(e); setIsMenuOpen(false); }} style={{ display: "none" }} />
      </label>

      <button
        onClick={() => { window.print(); setIsMenuOpen(false); }}
        style={{ padding: "8px 12px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "12px", textAlign: "left" }}
      >
        🖨️ Print / PDF
      </button>

      <button
        onClick={() => { onShareDeepLink(); setIsMenuOpen(false); }}
        style={{ padding: "8px 12px", backgroundColor: "#065f46", color: "#a7f3d0", border: "1px solid #047857", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", textAlign: "left" }}
      >
        🔗 Share Link
      </button>

      <button
        className="btn-danger"
        onClick={() => { onClearForm(); setIsMenuOpen(false); }}
        style={{ padding: "8px 12px", fontSize: "12px", textAlign: "left", width: "100%" }}
      >
        ↺ Reset Data
      </button>

      <button
        className="btn-secondary"
        onClick={() => { onBack(); setIsMenuOpen(false); }}
        style={{ padding: "8px 12px", fontSize: "12px", textAlign: "left", width: "100%" }}
      >
        ← Exit
      </button>
    </div>
  );
}
