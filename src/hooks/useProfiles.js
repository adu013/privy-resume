import { useState, useEffect } from "react";
import { compressData, decompressData } from "../utils/urlCOmpactor";

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

  // Derived Active Workspace Profile Data Selection
  const resumeData = profiles[activeProfileName] || blankBlueprint;

  // URL Hash Listener State
  useEffect(() => {
    const handleInboundHash = async () => {
      const hash = window.location.hash;
      if (hash.startsWith("#share=")) {
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
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.download = resumeData.fullName ? `${resumeData.fullName.replace(/\s+/g, "_")}_resume_backup.json` : "privy_resume_backup.json";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);
    triggerToast("📥 Data profile exported! JSON backup file downloaded successfully.");
  };

  // Offline JSON File Export Backup Streams
  const handleImportJSON = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        if (parsedData && typeof parsedData === "object") {
          setProfiles((prev) => ({ ...prev, [activeProfileName]: parsedData }));
          triggerToast("✓ Backup profile loaded successfully! Active profile data updated.");
        }
      } catch (err) {
        triggerToast("❌ Failed to parse data. Ensure file is a valid JSON backup.", "error");
      }
    };
    fileReader.readAsText(files);
    e.target.value = "";
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
    resumeData, profiles, activeProfileName,
    handleInputChange, addArrayItem, removeArrayItem,
    addJobHighlight: (idx) => addHighlightHelper("jobs", idx),
    removeJobHighlight: (jIdx, hIdx) => removeHighlightHelper("jobs", jIdx, hIdx),
    addProjectHighlight: (idx) => addHighlightHelper("projects", idx),
    removeProjectHighlight: (pIdx, hIdx) => removeHighlightHelper("projects", pIdx, hIdx),
    addSkillHighlight: (idx) => addHighlightHelper("skillsList", idx),
    removeSkillHighlight: (sIdx, hIdx) => removeHighlightHelper("skillsList", sIdx, hIdx),
    handleShareDeepLink,
    handleExportJSON, handleImportJSON,
    handleSwitchProfile, handleCreateProfile, handleDeleteProfile
  };
}
