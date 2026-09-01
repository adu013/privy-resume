import React, { useState } from "react";
import AwardsForm from "./AwardsForm";
import ContactForm from "./ContactForm";
import SummaryForm from "./SummaryForm";
import CompetenciesForm from "./CompetenciesForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import CertificationForm from "./CertificationForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import LinksForm from "./LinksForm";
import ReferencesForm from "./ReferencesForm";
import ResumePreview from "./ResumePreview";
import ProfileSwitcher from "./ProfileSwitcher";

export default function Workspace({
  profiles, activeProfileName, onSwitchProfile, onCreateProfile, onDeleteProfile,
  resumeData, onInputChange, onClearForm, onBack, onAddItem, onRemoveItem,
  onAddHighlight, onRemoveHighlight, onAddProjHighlight, onRemoveProjHighlight,
  onAddSkillHighlight, onRemoveSkillHighlight,
  onExportJSON, onImportJSON,
  onShareDeepLink,
  isSharedView, onExitPreview
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Array of step names for our clickable navigation bar
  const stepTabs = [
    "Identity", "Profile", "Compentencies","History", "Degrees",
    "Certs", "Projects", "Skills", "Links", "References", "Awards"
  ];

  const handleNext = () => {
    if (currentStep < 11) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // 🔒 START OF READ-ONLY PUBLIC PORTFOLIO SHOWCASE EMBED LAYER
  if (isSharedView) {
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
              style={{ padding: "8px 16px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "12px", boxShadow: "0 2px 4px rgba(147, 51, 234, 0.3)" }}
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

        {/* 🔒 FIXED FLUID CONTAINER: Bypasses .workspace-main constraints to expand fully across viewport */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "100%" // Forces full screen width distribution
        }}>
          {/* We wrap it inside an independent, unconstrained layout container item block */}
          <div style={{ width: "100%", maxWidth: "850px" }}>
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>

      </div>
    );
  }
  // 🔒 END OF READ-ONLY PUBLIC PORTFOLIO SHOWCASE EMBED LAYER

  return (
    <div className="workspace-container">

      {/* 🌟 GLOBAL PROFILE SWITCHER INTERFACE INJECTED AT THE TOP */}
      <ProfileSwitcher
        profiles={profiles}
        activeProfileName={activeProfileName}
        onSwitch={onSwitchProfile}
        onCreate={onCreateProfile}
        onDelete={onDeleteProfile}
      />

      {/* CLICKABLE WORKSPACE NAVIGATION BAR */}
      <header className="workspace-header" style={{ flexDirection: "column", gap: "12px", padding: "12px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div className="logo-area">
            <h1 className="logo-text" style={{ fontSize: "18px" }}>
              Privy<span className="logo-highlight">Workspace</span>
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
              <input
                type="file"
                accept=".json"
                onChange={onImportJSON}
                style={{ display: "none" }}
              />
            </label>

            <button
              onClick={() => window.print()}
              style={{ padding: "6px 14px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "12px" }}
            >
              🖨️ Download PDF / Print
            </button>

            {/** Share Button */}
            <button
              onClick={onShareDeepLink}
              style={{
                padding: "6px 12px",
                backgroundColor: "#065f46", // Deep jade emerald green color
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

            <button className="btn-danger" onClick={onClearForm}>Reset Data</button>
            <button className="btn-secondary" onClick={onBack}>← Exit</button>
          </div>
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

      {/* DUAL INTERACTIVE GRID PANELS */}
      <main className="workspace-main">

        {/* LEFT COMPONENT RENDERING FLOW */}
        <div className="form-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, overflowY: "auto", paddingBottom: "20px" }}>

            {currentStep === 1 && <ContactForm resumeData={resumeData} onInputChange={onInputChange} />}
            {currentStep === 2 && <SummaryForm resumeData={resumeData} onInputChange={onInputChange} />}

            {currentStep === 3 && (
              <CompetenciesForm
                resumeData={resumeData} onInputChange={onInputChange}
                onAddItem={onAddItem} onRemoveItem={onRemoveItem}
              />
            )}

            {currentStep === 4 && (
              <ExperienceForm
                resumeData={resumeData} onInputChange={onInputChange}
                onAddItem={onAddItem} onRemoveItem={onRemoveItem}
                onAddHighlight={onAddHighlight} onRemoveHighlight={onRemoveHighlight}
              />
            )}

            {currentStep === 5 && (
              <EducationForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            )}

            {currentStep === 6 && (
              <CertificationForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            )}

            {currentStep === 7 && (
              <ProjectForm
                resumeData={resumeData} onInputChange={onInputChange}
                onAddItem={onAddItem} onRemoveItem={onRemoveItem}
                onAddHighlight={onAddProjHighlight} onRemoveHighlight={onRemoveProjHighlight}
              />
            )}

            {/* STEPS INJECTED */}
            {currentStep === 8 && (
              <SkillsForm
                resumeData={resumeData}
                onInputChange={onInputChange}
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
                onAddHighlight={onAddSkillHighlight}      // 👈 FIXED
                onRemoveHighlight={onRemoveSkillHighlight} // 👈 FIXED
              />
            )}

            {currentStep === 9 && (
              <LinksForm
                resumeData={resumeData} onInputChange={onInputChange}
                onAddItem={onAddItem} onRemoveItem={onRemoveItem}
              />
            )}

            {currentStep === 10 && (
              <ReferencesForm
                resumeData={resumeData} onInputChange={onInputChange}
                onAddItem={onAddItem} onRemoveItem={onRemoveItem}
              />
            )}

            {currentStep === 11 && (
              <AwardsForm
                resumeData={resumeData} onInputChange={onInputChange}
                onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            )}

          </div>

          {/* SIDEBAR LOWER ACTION STEP CONTROLLERS */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#070d19" }}>
            <button
              className="btn-secondary" onClick={handlePrev} disabled={currentStep === 1}
              style={{ opacity: currentStep === 1 ? 0.4 : 1, cursor: currentStep === 1 ? "not-allowed" : "pointer" }}
            >
              ← Previous Section
            </button>

            {currentStep < 11 ? (
              <button
                onClick={handleNext}
                style={{ padding: "10px 20px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
              >
                Save & Next →
              </button>
            ) : (
              <div style={{ color: "#10b981", fontSize: "14px", fontWeight: "700" }}>
                ✓ All 11 Sections Complete!
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW COMPONENT CANVAS */}
        <ResumePreview resumeData={resumeData} />

      </main>
    </div>
  );
}
