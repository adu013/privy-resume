import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ToastNotification from "./components/TostNotification";
import Workspace from "./components/Workspace";
import { useProfiles } from "./hooks/useProfiles";
import { blankResumeBlueprint } from "./utils/blueprint"

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // Inject the Profile Management Engine Hook (from hooks/useProfile)
  const {
    resumeData,
    profiles,
    activeProfileName,
    isSharedView,
    setIsSharedView,
    handleInputChange, addArrayItem, removeArrayItem,
    addJobHighlight, removeJobHighlight,
    addProjectHighlight, removeProjectHighlight,
    addSkillHighlight, removeSkillHighlight,

    // JSON EXPORT/IMPORT HANDLER
    handleExportJSON, handleImportJSON,

    // PROFILE HANDLER
    handleClearActiveProfile,
    handleSwitchProfile,
    handleCreateProfile,
    handleCloneProfile,
    handleRenameProfile,
    handleLoadDemoProfile,
    handleDeleteProfile,

    // DEEPLINK HANDLER
    handleShareDeepLink,

    // CUSTOM SECTION
    handleAddCustomSection,
    handleCustomSectionChange,
    handleAddCustomItem,
    handleAddCustomHighlight,

  } = useProfiles(blankResumeBlueprint, triggerToast);

  // GUARD:
  // Render the workspace if the user clicked "Get Started"
  // OR if they landed directly via a deep share link!
  const shouldRenderWorkspace = isStarted || isSharedView;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "white" }}>
      {!shouldRenderWorkspace ? (
        <LandingPage onStart={() => setIsStarted(true)} />
      ) : (
          <Workspace
            resumeData={resumeData}
            onInputChange={handleInputChange}
            onAddItem={addArrayItem}
            onRemoveItem={removeArrayItem}
            onAddHighlight={addJobHighlight}
            onRemoveHighlight={removeJobHighlight}
            onAddProjHighlight={addProjectHighlight}
            onRemoveProjHighlight={removeProjectHighlight}
            onAddSkillHighlight={addSkillHighlight}
            onRemoveSkillHighlight={removeSkillHighlight}
            onExportBackup={handleExportJSON}
            onImportBackup={handleImportJSON}
            onShareDeepLink={handleShareDeepLink}

            onClearForm={handleClearActiveProfile}

            // PROFILE SECTION
            profiles={profiles}
            activeProfileName={activeProfileName}
            onSwitchProfile={handleSwitchProfile}
            onCreateProfile={handleCreateProfile}
            onRenameProfile={handleRenameProfile}
            onDeleteProfile={handleDeleteProfile}

            // CLONE PROFILE
            onCloneProfile={handleCloneProfile}

            // ON LOAD DEMO PROFILE
            onLoadDemoProfile={handleLoadDemoProfile}

            // CUSTOM SECTION
            onAddCustomSection={handleAddCustomSection}
            onCustomSectionChange={handleCustomSectionChange}
            onAddCustomItem={handleAddCustomItem}
            onAddCustomHighlight={handleAddCustomHighlight}

            // ACTIVATE SHARED VIEW WHEN USER HITS THE DEEP LINK
            isSharedView={isSharedView}
            onExitPreview={() => {
              setIsStarted(true);
              setIsSharedView(false);
            }}

            // EXPORT / IMPORT JSON
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}

            // GO BACK TO LANDING PAGE
            onBack={() => setIsStarted(false)}

            style={{ flex: "1 1 auto", width: "100%", maxWidth: "100%" }}
          />
      )}

      <ToastNotification toast={toast} />
    </div>
  );
}
