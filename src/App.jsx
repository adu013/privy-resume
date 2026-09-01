import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ToastNotification from "./components/TostNotification";
import Workspace from "./components/Workspace";
import { useProfiles } from "./hooks/useProfiles";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Resume item blueprint with all necessary array elements
  const blankResumeBlueprint = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    competencies: [{ name: "" }],
    jobs: [
      { company: "", country: "", companyLink: "", jobTitle: "", jobStart: "", jobEnd: "", highlights: [""] }
    ],
    degrees: [
      { collegeName: "", degree: "", specialization: "", eduStart: "", eduEnd: "" }
    ],
    certifications: [
      { certName: "", certInstitute: "", certDate: "" }
    ],
    projects: [
      { name: "", projectLink: "", projStart: "", projEnd: "", summary: "", highlights: [""] }
    ],
    skillsList: [
      { name: "", highlights: [""] }
    ],
    linkedin: "",
    github: "",
    gitlab: "",
    xplatform: "",
    otherLinks: [
      { label: "", url: "" }
    ],

    // Section Dynamic Ordering
    sectionOrder: [
      "summary",
      "competencies",
      "experience",
      "projects",
      "education",
      "skills",
      "certifications",
      "awards",
      "references"
    ],

    // References
    references: [{ name: "", title: "", company: "", contact: "" }],

    // Awards
    awards: [{ title: "", issuer: "", date: "", summary: "" }],

    // Page-Density Slider Engine Properties (Default Mid-Points)
    selectedFontSize: 13,      /* Adjustable from 11px to 15px */
    selectedLineHeight: 1.5,   /* Adjustable from 1.2 to 1.8 */
    selectedSectionMargin: 12, /* Adjustable from 6px to 24px */

    // Font Selection
    selectedFont: "sans",

    // Layout Selection
    selectedLayout: "classic",

    // Headline Color Selection
    headlineColor: "#4f46e5",

    // Branding checkbox (True by default)
    showBranding: true
  };

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
    handleExportJSON, handleImportJSON,
    handleSwitchProfile, handleCreateProfile, handleDeleteProfile,
    handleShareDeepLink
  } = useProfiles(blankResumeBlueprint, triggerToast);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "white" }}>
      {!isStarted ? (
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

            profiles={profiles}
            activeProfileName={activeProfileName}
            onSwitchProfile={handleSwitchProfile}
            onCreateProfile={handleCreateProfile}
            onDeleteProfile={handleDeleteProfile}

            // Shared View
            isSharedView={isSharedView}
            onExitPreview={() => setIsSharedView(false)}

            style={{ flex: "1 1 auto", width: "100%", maxWidth: "100%" }}
          />
      )}

      <ToastNotification toast={toast} />
    </div>
  );
}
