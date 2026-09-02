import { useState, useEffect } from "react";
import { compressData, decompressData } from "../utils/urlCompactor";
import { demoProfilePayload } from "../utils/demoProfileData";

export function useProfiles(blankBlueprint, triggerToast) {

  // Initialise Active Profile Name Tracking
  const [activeProfileName, setActiveProfileName] = useState(() => {
    return localStorage.getItem("privy_active_profile_name") || "Default Profile";
  });

  // Initialise Master Profiles Dictionary
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem("privy_all_profiles_cache");
    if (savedProfiles) {
      try {
        return JSON.parse(savedProfiles);
      } catch (e) {
        console.error("Failed to parse accounts matrix profiles database:", e);
      }
    }
    const legacySaved = localStorage.getItem("privy_resume_cache");
    const baselineData = legacySaved ? JSON.parse(legacySaved) : blankBlueprint;
    return { "Default Profile": baselineData };
  });

  // START: CLONE PROFILE
  const handleCloneProfile = () => {
    const cloneName = `${activeProfileName} (Copy)`;

    // Check if a clone with this exact text extension already exists to avoid collisions
    if (profiles[cloneName]) {
      triggerToast(`❌ A cloned profile named "${cloneName}" already exists!`, "error");
      return;
    }

    // Create a deep structural clone copy of the active resume data slice
    const duplicatedData = JSON.parse(JSON.stringify(resumeData));

    setProfiles(prev => ({
      ...prev,
      [cloneName]: duplicatedData
    }));

    // Instantly flip the user workspace focus directly onto their fresh clone copy slot
    setActiveProfileName(cloneName);
    triggerToast(`📄 Profile "${activeProfileName}" duplicated cleanly into "${cloneName}"!`);
  };
  // END: CLONE PROFILE

  // START: LOAD DEMO PROFILE
  const handleLoadDemoProfile = () => {
    // Take a clean, uncoupled deep-copy clone snapshot of the mockup data payload
    const freshDemoSnapshot = JSON.parse(JSON.stringify(demoProfilePayload));

    setProfiles(prev => ({
      ...prev,
      [activeProfileName]: freshDemoSnapshot
    }));

    triggerToast(`Realistic mockup profile loaded cleanly into "${activeProfileName}"!`);
  };
  // END: LOAD DEMO PROFILE

   // STRICT VISIBILITY ENGINE: Initialized to false so root direct hits default to form fields!
  const [isSharedView, setIsSharedView] = useState(false);

  // Derived Active Workspace Profile Data Selection
  const resumeData = profiles[activeProfileName] || blankBlueprint;

  // URL Hash Listener State
  useEffect(() => {
    const handleInboundHash = async () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#share=")) {
        const token = hash.replace("#share=", "");
        if (!token) return;

        const parsedData = await decompressData(token);
        if (parsedData && typeof parsedData === "object") {
          const sharedName = `Shared (${parsedData.fullName || "Portfolio"})`;

          setProfiles(prev => ({
            ...prev,
            [sharedName]: parsedData
          }));
          setActiveProfileName(sharedName);

          // TRIGGER READ-ONLY PUBLIC PREVIEW MODE ACTIVE
          setIsSharedView(true);

          // Strip hash parameters out cleanly from the browser address bar bar for clean hygiene
          window.history.replaceState(null, "", window.location.pathname);
          triggerToast("✨ Shared data profile loaded completely offline via deep-link!");
        }
      }
    };

    handleInboundHash();
  }, []);

  // Synchronise State Elements to Persistent Browser Caches
  useEffect(() => {
    localStorage.setItem("privy_all_profiles_cache", JSON.stringify(profiles));
    localStorage.setItem("privy_active_profile_name", activeProfileName);
  }, [profiles, activeProfileName]);

  // Profile Switching, Factory Creation, and Deletion Closures
  const handleSwitchProfile = (name) => {
    if (profiles[name]) {
      setActiveProfileName(name);
      triggerToast(`✓ Switched to profile: "${name}"`);
    }
  };

  const handleClearActiveProfile = () => {
    setProfiles((prev) => ({
      ...prev,
      [activeProfileName]: JSON.parse(JSON.stringify(blankBlueprint)) // Clones a fresh blank template slate
    }));
    triggerToast(`↺ Profile "${activeProfileName}" reset back to empty template baseline.`);
  };

  const handleCreateProfile = (name) => {
    const trimmed = name?.trim();
    if (!trimmed) return;
    if (profiles[trimmed]) {
      triggerToast("❌ A profile with this name already exists!", "error");
      return;
    }
    setProfiles((prev) => ({
      ...prev,
      [trimmed]: JSON.parse(JSON.stringify(blankBlueprint)),
    }));
    setActiveProfileName(trimmed);
    triggerToast(`✓ Profile "${trimmed}" created successfully!`);
  };

  // Action closure for renaming User Profile:
  const handleRenameProfile = (newName) => {
    const trimmed = newName?.trim();

    // Guard 1: Prevent empty strings
    if (!trimmed) {
      triggerToast("❌ Profile name cannot be empty!", "error");
      return;
    }

    // Guard 2: Skip operation if the name is identical to its current name
    if (trimmed === activeProfileName) {
      return;
    }

    // Guard 3: Block execution if another profile already owns this name signature
    if (profiles[trimmed]) {
      triggerToast(`❌ A profile named "${trimmed}" already exists!`, "error");
      return;
    }

    setProfiles(prev => {
      const updatedProfiles = { ...prev };
      // Fetch and preserve the active profile's data slice character-for-character
      const activeDataSnapshot = updatedProfiles[activeProfileName];

      // Inject the data into the new key slot and delete the obsolete key entry safely
      updatedProfiles[trimmed] = activeDataSnapshot;
      delete updatedProfiles[activeProfileName];

      // Instantly flip the user workspace focus directly onto their renamed account track
      setActiveProfileName(trimmed);
      return updatedProfiles;
    });

    triggerToast(`✏️ Profile renamed successfully to "${trimmed}"!`);
  };

  // Action closure for deleting User Profile
  const handleDeleteProfile = (name) => {
    const profileKeys = Object.keys(profiles);
    if (profileKeys.length <= 1) {
      triggerToast("❌ Cannot delete your last remaining profile!", "error");
      return;
    }
    setProfiles((prev) => {
      const updated = { ...prev };
      delete updated[name];
      const remaining = Object.keys(updated);
      setActiveProfileName(remaining[0]);
      return updated;
    });
    triggerToast(`✓ Profile "${name}" removed cleanly.`);
  };

  // Flexible Nested Form Value Mutation Input Handlers
  const handleInputChange = (e, index = null, arrayName = null, subIndex = null) => {
    const { name, value, type, checked } = e.target || {};
    const targetName = name || e.target?.getAttribute("name");
    const targetValue = type === "checkbox" ? checked : value !== undefined ? value : e;

    setProfiles((prev) => {
      const currentProfileData = { ...prev[activeProfileName] };

      if ((arrayName === "jobs" || arrayName === "projects" || arrayName === "skillsList") && subIndex !== null && index !== null) {
        const updatedArray = [...(currentProfileData[arrayName] || [])];
        const updatedHighlights = [...(updatedArray[index]?.highlights || [""])];
        updatedHighlights[subIndex] = targetValue;
        updatedArray[index] = { ...updatedArray[index], highlights: updatedHighlights };
        currentProfileData[arrayName] = updatedArray;
      } else if (arrayName && index !== null) {
        const updatedArray = [...(currentProfileData[arrayName] || [])];
        updatedArray[index] = { ...updatedArray[index], [targetName]: targetValue };
        currentProfileData[arrayName] = updatedArray;
      } else {
        const keyName = targetName || e.target?.name;
        currentProfileData[keyName] = targetValue;
      }

      return { ...prev, [activeProfileName]: currentProfileData };
    });
  };

  // Core Repeatable List Append Operators
  const addArrayItem = (arrayName, emptyBlueprint) => {
    setProfiles((prev) => {
      const currentProfileData = { ...prev[activeProfileName] };
      currentProfileData[arrayName] = [...(currentProfileData[arrayName] || []), emptyBlueprint];
      return { ...prev, [activeProfileName]: currentProfileData };
    });
  };

  const removeArrayItem = (arrayName, index) => {
    setProfiles((prev) => {
      const currentProfileData = { ...prev[activeProfileName] };
      if ((currentProfileData[arrayName] || []).length <= 1) return prev;
      const updatedArray = currentProfileData[arrayName].filter((_, i) => i !== index);
      currentProfileData[arrayName] = updatedArray;
      return { ...prev, [activeProfileName]: currentProfileData };
    });
  };

  // Helper macro closures to append sub-nested descriptions (jobs, projects, skillsList)
  const addHighlightHelper = (arrayKey, targetIdx) => {
    setProfiles((prev) => {
      const currentProfileData = { ...prev[activeProfileName] };
      const list = [...(currentProfileData[arrayKey] || [])];
      list[targetIdx] = { ...list[targetIdx], highlights: [...(list[targetIdx]?.highlights || []), ""] };
      currentProfileData[arrayKey] = list;
      return { ...prev, [activeProfileName]: currentProfileData };
    });
  };

  const removeHighlightHelper = (arrayKey, targetIdx, highIdx) => {
    setProfiles((prev) => {
      const currentProfileData = { ...prev[activeProfileName] };
      const list = [...(currentProfileData[arrayKey] || [])];
      if ((list[targetIdx]?.highlights || []).length <= 1) return prev;
      list[targetIdx].highlights = list[targetIdx].highlights.filter((_, i) => i !== highIdx);
      currentProfileData[arrayKey] = list;
      return { ...prev, [activeProfileName]: currentProfileData };
    });
  };

  // Offline JSON File Export Backup Streams
  const handleExportJSON = () => {
    // 🌍 Package everything: the complete multi-profile registry and the currently selected account name tracker key
    const fullBackupPayload = {
      isMasterBackup: true, // Internal schema identifier token
      activeProfileName: activeProfileName,
      profiles: profiles
    };

    const dataStr = JSON.stringify(fullBackupPayload, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;

    // Smart file naming logic matching your active account workspace parameters
    const safeProfileName = activeProfileName.replace(/\s+/g, "_");
    const fileName = resumeData.fullName
      ? `${resumeData.fullName.replace(/\s+/g, "_")}_(${safeProfileName})_master_backup.json`
      : `privy_workspace_(${safeProfileName})_master_backup.json`;

    tempLink.download = fileName;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);

    triggerToast("📥 Complete dashboard database exported! All profiles backed up successfully.");
  };


  // Offline JSON File Export Backup Streams
  // 🔒 UPGRADED MULTI-PROFILE INTELLIGENT PARSER RESTORER
  const handleImportJSON = (e) => {
    const targetInputFiles = e?.target?.files || e?.files || e;
    const selectedFile = targetInputFiles && targetInputFiles.length > 0 ? targetInputFiles[0] : null;

    if (!selectedFile) {
      triggerToast("❌ No valid backup file selected.", "error");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        if (parsedData && typeof parsedData === "object") {

          // 📁 PATH A: Handles your new Full Master Multi-Profile system backups seamlessly
          if (parsedData.isMasterBackup && parsedData.profiles) {
            setProfiles(parsedData.profiles);
            if (parsedData.activeProfileName && parsedData.profiles[parsedData.activeProfileName]) {
              setActiveProfileName(parsedData.activeProfileName);
            } else {
              setActiveProfileName(Object.keys(parsedData.profiles)[0]);
            }
            triggerToast("✓ Master multi-profile ecosystem restored successfully!");
          }
          // 📄 PATH B: Fallback backward-compatibility support for single flat resume backup models
          else if (parsedData.hasOwnProperty("Default Profile") || Object.keys(parsedData).some(k => parsedData[k]?.sectionOrder)) {
            setProfiles(parsedData);
            setActiveProfileName(Object.keys(parsedData)[0]);
            triggerToast("✓ Multi-profile dictionary parsed successfully!");
          } else {
            // Overwrites just the active layout lane card slot with their single resume data
            setProfiles((prev) => ({
              ...prev,
              [activeProfileName]: parsedData
            }));
            triggerToast(`✓ Backup profile data loaded cleanly into "${activeProfileName}"!`);
          }
        }
      } catch (err) {
        console.error("Malformed backup processing failure:", err);
        triggerToast("❌ Failed to parse data. Ensure file is a valid JSON backup.", "error");
      }
    };

    fileReader.readAsText(selectedFile);
    if (e?.target) {
      e.target.value = "";
    }
  };



  // Expose sharing utility:
  const handleShareDeepLink = async () => {
    const compressed = await compressData(resumeData);
    if (!compressed) {
      triggerToast("❌ Failed to compress resume link data.", "error");
      return;
    }

    // Construct the URL using the hash parameter fragment strategy
    const shareUrl = `${window.location.origin}${window.location.pathname}#share=${compressed}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      triggerToast("🔗 Sharable link copied to clipboard! Database-free.");
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      triggerToast("❌ Clipboard access denied. Copy link manually.", "error");
    }
  };

  return {
    resumeData,
    profiles,
    activeProfileName,
    isSharedView,
    setIsSharedView,
    handleInputChange, addArrayItem, removeArrayItem,
    addJobHighlight: (idx) => addHighlightHelper("jobs", idx),
    removeJobHighlight: (jIdx, hIdx) => removeHighlightHelper("jobs", jIdx, hIdx),
    addProjectHighlight: (idx) => addHighlightHelper("projects", idx),
    removeProjectHighlight: (pIdx, hIdx) => removeHighlightHelper("projects", pIdx, hIdx),
    addSkillHighlight: (idx) => addHighlightHelper("skillsList", idx),
    removeSkillHighlight: (sIdx, hIdx) => removeHighlightHelper("skillsList", sIdx, hIdx),
    handleShareDeepLink,
    handleExportJSON, handleImportJSON,
    // Profile handlers
    handleClearActiveProfile,
    handleSwitchProfile,
    handleCreateProfile,
    handleCloneProfile,
    handleRenameProfile,
    handleLoadDemoProfile,
    handleDeleteProfile
  };
}
