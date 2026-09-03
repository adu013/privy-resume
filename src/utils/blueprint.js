  // MASTER RESUME DATA BLUEPRINT BASELINE MODEL
  export const blankResumeBlueprint = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    competencies: [{ name: "" }],
    jobs: [{
      company: "",
      country: "",
      companyLink: "",
      jobTitle: "",
      employmentType: "None",
      jobStart: "",
      jobEnd: "",
      highlights: [""]
    }],
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

    // Custom Section
    customSection: [],

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
