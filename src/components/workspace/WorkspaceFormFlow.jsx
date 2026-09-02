import React from "react";
import ContactForm from "../ContactForm";
import SummaryForm from "../SummaryForm";
import CompetenciesForm from "../CompetenciesForm";
import ExperienceForm from "../ExperienceForm";
import EducationForm from "../EducationForm";
import CertificationForm from "../CertificationForm";
import ProjectForm from "../ProjectForm";
import SkillsForm from "../SkillsForm";
import LinksForm from "../LinksForm";
import ReferencesForm from "../ReferencesForm";
import AwardsForm from "../AwardsForm";
import CustomSectionForm from "../forms/CustomSectionForm";

export default function WorkspaceFormFlow({
  currentStep,
  resumeData,
  onInputChange,
  onAddItem,
  onRemoveItem,
  onAddHighlight,
  onRemoveHighlight,
  onAddProjHighlight,
  onRemoveProjHighlight,
  onAddSkillHighlight,
  onRemoveSkillHighlight,
  handlePrev,
  handleNext,

  onAddCustomSection,
  onCustomSectionChange,
  onAddCustomItem,
  onAddCustomHighlight
}) {
  return (
    <div className="form-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* MAIN CONTENT HOOD: All forms (including step 12) mount here to stay scrollable and perfectly aligned */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "20px" }}>
        {currentStep === 1 && <ContactForm resumeData={resumeData} onInputChange={onInputChange} />}
        {currentStep === 2 && <SummaryForm resumeData={resumeData} onInputChange={onInputChange} />}
        {currentStep === 3 && (
          <CompetenciesForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
        )}
        {currentStep === 4 && (
          <ExperienceForm
            resumeData={resumeData} onInputChange={onInputChange}
            onAddItem={onAddItem} onRemoveItem={onRemoveItem}
            onAddHighlight={onAddHighlight} onRemoveHighlight={onRemoveHighlight}
          />
        )}
        {currentStep === 5 && <EducationForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}
        {currentStep === 6 && <CertificationForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}
        {currentStep === 7 && (
          <ProjectForm
            resumeData={resumeData} onInputChange={onInputChange}
            onAddItem={onAddItem} onRemoveItem={onRemoveItem}
            onAddHighlight={onAddProjHighlight} onRemoveHighlight={onRemoveProjHighlight}
          />
        )}
        {currentStep === 8 && (
          <SkillsForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} onAddHighlight={onAddSkillHighlight} />
        )}
        {currentStep === 9 && <LinksForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}
        {currentStep === 10 && <ReferencesForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}
        {currentStep === 11 && <AwardsForm resumeData={resumeData} onInputChange={onInputChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}

        {/* CUSTOM SECTION: Renders step 12 inside the wide viewport grid above the footer buttons */}
        {currentStep === 12 && (
            <CustomSectionForm
                customSections={resumeData.customSections || []}
                onAddSection={onAddCustomSection}
                onChange={onCustomSectionChange}
                onAddItem={onAddCustomItem}
                onAddHighlight={onAddCustomHighlight}
            />
        )}
      </div>

      {/* LOWER NAVIGATION TIMELINE CONTROLLERS */}
      <div style={{ borderTop: "1px solid #1e293b", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#070d19" }}>
        <button
          className="btn-secondary" onClick={handlePrev} disabled={currentStep === 1}
          style={{ opacity: currentStep === 1 ? 0.4 : 1, cursor: currentStep === 1 ? "not-allowed" : "pointer" }}
        >
          ← Previous Section
        </button>

        {/* COUNTER LIMIT BOUNDS: Next button stays perfectly visible up until the absolute terminal step */}
        {currentStep < 12 ? (
          <button
            className="btn-primary" onClick={handleNext}
            style={{ padding: "10px 20px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}
          >
            Next Section →
          </button>
        ) : (
          /* Empty balanced alignment spacer block node when resting on terminal section 12 */
          <div style={{ width: "120px" }} />
        )}
      </div>
    </div>
  );
}
