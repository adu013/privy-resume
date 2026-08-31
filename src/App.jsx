import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Workspace from "./components/Workspace";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  // 1. Initial State blueprint layout with all necessary array elements
  const blankResumeBlueprint = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    competencies: [{ name: "" }],
    jobs: [
      { company: "", country: "", jobTitle: "", jobStart: "", jobEnd: "", highlights: [""] }
    ],
    degrees: [
      { collegeName: "", degree: "", specialization: "", eduStart: "", eduEnd: "" }
    ],
    certifications: [
      { certName: "", certInstitute: "", certDate: "" }
    ],
    projects: [
      { name: "", projStart: "", projEnd: "", summary: "", highlights: [""] }
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

  // 2. Load cached records directly from browser local storage
  const [resumeData, setResumeData] = useState(() => {
    const localSaved = localStorage.getItem("privy_resume_cache");
    return localSaved ? JSON.parse(localSaved) : blankResumeBlueprint;
  });

  // 3. Save updates instantly into your offline storage folder
  useEffect(() => {
    localStorage.setItem("privy_resume_cache", JSON.stringify(resumeData));
  }, [resumeData]);

  // 4. Flexible input handler for simple text inputs, main arrays, and sub-nested list bullets
  const handleInputChange = (e, index = null, arrayName = null, subIndex = null) => {
    const { name, value, type, checked } = e.target;

    if ((arrayName === "jobs" || arrayName === "projects" || arrayName === "skillsList") && subIndex !== null && index !== null) {
      setResumeData((prev) => {
        const updatedArray = [...(prev[arrayName] || [])];
        const updatedHighlights = [...(updatedArray[index]?.highlights || [""])];
        updatedHighlights[subIndex] = value;
        updatedArray[index] = { ...updatedArray[index], highlights: updatedHighlights };
        return { ...prev, [arrayName]: updatedArray };
      });
    } else if (arrayName && index !== null) {
      setResumeData((prev) => {
        const updatedArray = [...(prev[arrayName] || [])];
        updatedArray[index] = { ...updatedArray[index], [name]: value };
        return { ...prev, [arrayName]: updatedArray };
      });
    } else {
      setResumeData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  // 5. Append utilities for primary list objects
  const addArrayItem = (arrayName, emptyBlueprint) => {
    setResumeData((prev) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), emptyBlueprint]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setResumeData((prev) => {
      if ((prev[arrayName] || []).length <= 1) return prev;
      const updatedArray = prev[arrayName].filter((_, i) => i !== index);
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  // 6. Sub-nested description highlight array appenders
  const addJobHighlight = (jobIndex) => {
    setResumeData((prev) => {
      const updatedJobs = [...(prev.jobs || [])];
      updatedJobs[jobIndex] = {
        ...updatedJobs[jobIndex],
        highlights: [...(updatedJobs[jobIndex]?.highlights || []), ""]
      };
      return { ...prev, jobs: updatedJobs };
    });
  };

  const removeJobHighlight = (jobIndex, highlightIndex) => {
    setResumeData((prev) => {
      const updatedJobs = [...(prev.jobs || [])];
      if (updatedJobs[jobIndex].highlights.length <= 1) return prev;
      updatedJobs[jobIndex].highlights = updatedJobs[jobIndex].highlights.filter(
        (_, i) => i !== highlightIndex
      );
      return { ...prev, jobs: updatedJobs };
    });
  };

  const addProjectHighlight = (projIndex) => {
    setResumeData((prev) => {
      const updatedProjs = [...(prev.projects || [])];
      updatedProjs[projIndex] = {
        ...updatedProjs[projIndex],
        highlights: [...(updatedProjs[projIndex]?.highlights || []), ""]
      };
      return { ...prev, projects: updatedProjs };
    });
  };

  const removeProjectHighlight = (projIndex, highlightIndex) => {
    setResumeData((prev) => {
      const updatedProjs = [...(prev.projects || [])];
      if (updatedProjs[projIndex].highlights.length <= 1) return prev;
      updatedProjs[projIndex].highlights = updatedProjs[projIndex].highlights.filter(
        (_, i) => i !== highlightIndex
      );
      return { ...prev, projects: updatedProjs };
    });
  };

  const addSkillHighlight = (skillIndex) => {
    setResumeData((prev) => {
      const updatedSkills = [...(prev.skillsList || [])];
      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        highlights: [...(updatedSkills[skillIndex]?.highlights || []), ""]
      };
      return { ...prev, skillsList: updatedSkills };
    });
  };

  const removeSkillHighlight = (skillIndex, highlightIndex) => {
    setResumeData((prev) => {
      const updatedSkills = [...(prev.skillsList || [])];
      if (updatedSkills[skillIndex].highlights.length <= 1) return prev;
      updatedSkills[skillIndex].highlights = updatedSkills[skillIndex].highlights.filter(
        (_, i) => i !== highlightIndex
      );
      return { ...prev, skillsList: updatedSkills };
    });
  };

  // 7. EXPORT BACKUP LOGIC (Safely contained inside App component)
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.href = url;

    const fileName = resumeData.fullName
      ? `${resumeData.fullName.replace(/\s+/g, "_")}_resume_backup.json`
      : "privy_resume_backup.json";

    tempLink.download = fileName;
    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);
  };

  // 8. IMPORT BACKUP LOGIC (Safely contained inside App component)
  const handleImportJSON = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        if (parsedData && typeof parsedData === "object") {
          setResumeData(parsedData);
          alert("✓ Backup configuration loaded successfully!");
        } else {
          alert("✕ Invalid file configuration format.");
        }
      } catch (error) {
        alert("✕ Error parsing file backup.");
      }
    };
    fileReader.readAsText(files[0]);
  };

  // 9. Reset form data safely
  const handleClearForm = () => {
    if (window.confirm("Are you sure you want to permanently delete all details from your browser memory?")) {
      setResumeData(blankResumeBlueprint);
    }
  };

  return isStarted ? (
    <Workspace
      resumeData={resumeData}
      onInputChange={handleInputChange}
      onClearForm={handleClearForm}
      onBack={() => setIsStarted(false)}
      onAddItem={addArrayItem}
      onRemoveItem={removeArrayItem}
      onAddHighlight={addJobHighlight}
      onRemoveHighlight={removeJobHighlight}
      onAddProjHighlight={addProjectHighlight}
      onRemoveProjHighlight={removeProjectHighlight}
      onAddSkillHighlight={addSkillHighlight}
      onRemoveSkillHighlight={removeSkillHighlight}
      onExportJSON={handleExportJSON}
      onImportJSON={handleImportJSON}
    />
  ) : (
    <LandingPage onStart={() => setIsStarted(true)} />
  );
}
