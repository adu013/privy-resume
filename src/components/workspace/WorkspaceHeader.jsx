import React from "react";

export default function WorkspaceHeader({
  currentStep,
  setCurrentStep,
  stepTabs,
  isMenuOpen,
  setIsMenuOpen,
  onLoadDemoProfile,
  onExportJSON,
  onImportJSON,
  onShareDeepLink,
  onClearForm,
  onBack
}) {
  return (
    <header className="workspace-header" style={{ flexDirection: "column", gap: "12px", padding: "12px 24px", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div className="logo-area">
          <h1 className="logo-text" style={{ fontSize: "18px", margin: 0 }}>
            Privy<span className="logo-highlight">Workspace</span>
          </h1>
        </div>

        {/* 🖥️ DESKTOP VIEW ACTIONS TOOLBELT */}
        <div className="desktop-actions-row" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={onLoadDemoProfile}
            style={{
              padding: "6px 12px",
              backgroundColor: "#1e1b4b",
              color: "#a5b4fc",
              border: "1px solid #4338ca",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "700",
              boxShadow: "0 0 10px rgba(99, 102, 241, 0.15)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#312e81"; e.target.style.boxShadow = "0 0 14px rgba(99, 102, 241, 0.3)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#1e1b4b"; e.target.style.boxShadow = "0 0 10px rgba(99, 102, 241, 0.15)"; }}
          >
            ✨ Load Demo Profile
          </button>

          <button
            onClick={onExportJSON}
            style={{ padding: "6px 12px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
          >
            📥 Export Data (.json)
          </button>

          <label
            style={{ padding: "6px 12px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", display: "inline-block" }}
          >
            📤 Import Data
            <input type="file" accept=".json" onChange={onImportJSON} style={{ display: "none" }} />
          </label>

          <button
            onClick={() => window.print()}
            style={{ padding: "6px 14px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "12px" }}
          >
            🖨️ Print
          </button>

          <button
            onClick={onShareDeepLink}
            style={{
              padding: "6px 12px",
              backgroundColor: "#065f46",
              color: "#a7f3d0",
              border: "1px solid #047857",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#065f46"}
          >
            🔗 Share Link
          </button>

          <button className="btn-danger" onClick={onClearForm}>↺ Reset Data</button>
          <button className="btn-secondary" onClick={onBack}>← Exit</button>
        </div>

        {/* 📱 MOBILE HAMBURGER MENU TOGGLE TRIGGER */}
        <button
          type="button"
          className="mobile-menu-hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            padding: "6px 12px",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "6px",
            color: "#cbd5e1",
            fontSize: "12px",
            fontWeight: "700",
            cursor: "pointer",
            zIndex: 60
          }}
        >
          {isMenuOpen ? "✕ Close" : "☰ Actions Menu"}
        </button>
      </div>

      {/* Horizontal Section Tab Switchers */}
      <div style={{ display: "flex", gap: "6px", width: "100%", overflowX: "auto", paddingBottom: "4px" }}>
        {stepTabs.map((tabName, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          return (
            <button
              key={stepNum}
              onClick={() => setCurrentStep(stepNum)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                border: "1px solid",
                backgroundColor: isActive ? "#a855f7" : "#0f172a",
                color: isActive ? "white" : "#94a3b8",
                borderColor: isActive ? "#a855f7" : "#1e293b",
                transition: "all 0.2s"
              }}
            >
              {stepNum}. {tabName}
            </button>
          );
        })}
      </div>
    </header>
  );
}
