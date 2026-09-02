import React, { useState } from "react";
import ResumePreview from "./ResumePreview"
import ProfileSwitcher from "./ProfileSwitcher";
import WorkspaceHeader from "./workspace/WorkspaceHeader";
import WorkspaceMobileMenu from "./workspace/WorkspaceMobileMenu";
import WorkspaceFormFlow from "./workspace/WorkspaceFormFlow";
import WorkspacePublicPreview from "./workspace/WorkspacePublicPreview";

export default function Workspace(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stepTabs = [
    "Identity", "Profile", "Compentencies", "History", "Degrees",
    "Certs", "Projects", "Skills", "Links", "References", "Awards"
  ];

  const handleNext = () => {
    if (currentStep < 11) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // PUBLIC READ-ONLY PORTFOLIO PREVIEW VIEW MODE
  if (props.isSharedView) {
    return (
      <WorkspacePublicPreview
        resumeData={props.resumeData}
        onExitPreview={props.onExitPreview}
      />
    );
  }

  return (
    <div className="workspace-container" style={{ position: "relative" }}>
      <ProfileSwitcher
        profiles={props.profiles} activeProfileName={props.activeProfileName}
        onSwitch={props.onSwitchProfile} onCreate={props.onCreateProfile}
        onCloneProfile={props.onCloneProfile} onRenameProfile={props.onRenameProfile} onDelete={props.onDeleteProfile}
      />

      <WorkspaceHeader
        currentStep={currentStep} setCurrentStep={setCurrentStep} stepTabs={stepTabs}
        isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}
        onLoadDemoProfile={props.onLoadDemoProfile} onExportJSON={props.onExportJSON}
        onImportJSON={props.onImportJSON} onShareDeepLink={props.onShareDeepLink}
        onClearForm={props.onClearForm} onBack={props.onBack}
      />

      {isMenuOpen && (
        <WorkspaceMobileMenu
          setIsMenuOpen={setIsMenuOpen} onLoadDemoProfile={props.onLoadDemoProfile}
          onExportJSON={props.onExportJSON} onImportJSON={props.onImportJSON}
          onShareDeepLink={props.onShareDeepLink} onClearForm={props.onClearForm} onBack={props.onBack}
        />
      )}

      <main className="workspace-main">
        <WorkspaceFormFlow
          currentStep={currentStep} resumeData={props.resumeData} onInputChange={props.onInputChange}
          onAddItem={props.onAddItem} onRemoveItem={props.onRemoveItem}
          onAddHighlight={props.onAddHighlight} onRemoveHighlight={props.onRemoveHighlight}
          onAddProjHighlight={props.onAddProjHighlight} onRemoveProjHighlight={props.onRemoveProjHighlight}
          onAddSkillHighlight={props.onAddSkillHighlight} onRemoveSkillHighlight={props.onRemoveSkillHighlight}
          handlePrev={handlePrev} handleNext={handleNext}
        />
        <ResumePreview resumeData={props.resumeData} />
      </main>
    </div>
  );
}
