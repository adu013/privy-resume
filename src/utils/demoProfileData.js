export const demoProfilePayload = {
  fullName: "Alex Mercer",
  email: "alex.mercer@example.com",
  phone: "+1 (555) 019-2834",
  location: "San Francisco, CA",
  summary: "High-performance Senior Software Architect with 8+ years of expertise in client-side performance tuning, serverless cloud systems, and building robust, distributed microfrontends. Passionate about privacy-first open source engineering and reducing web runtime sizes.",

  linkedin: "https://linkedin.com",
  github: "https://github.com",
  gitlab: "",
  xplatform: "https://x.com",

  competencies: [
    { name: "Distributed Systems Design" },
    { name: "Frontend State Architecture" },
    { name: "Performance Optimization & WebGPU" },
    { name: "CI/CD GitOps Infrastructure Tuning" }
  ],

  jobs: [
    {
      company: "Stark Tech Solutions",
      country: "USA",
      companyLink: "https://starkenterprises.com",
      jobTitle: "Principal UI Architect",
      jobStart: "Mar-2023",
      jobEnd: "Present",
      highlights: [
        "Re-architected core frontend billing dashboard components, slashing absolute loading cycles by 42% across 3M active sessions.",
        "Led a cross-functional squad of 6 senior engineers to migrate legacy monolith bundles into modular, decoupled micro-frontends.",
        "Established automated client-side testing parameters that pushed global pipeline regression-safety coverage straight to 88%."
      ]
    },
    {
      company: "Cyberdyne Systems",
      country: "Remote",
      companyLink: "https://cyberdyne.io",
      jobTitle: "Senior Systems Engineer",
      jobStart: "Jan-2021",
      jobEnd: "Feb-2023",
      highlights: [
        "Built low-latency real-time data ingestion pipelines utilizing Node.js streams and buffer-driven WebSocket frameworks.",
        "Decreased cloud serverless runtime optimization memory leaks by 31% via structural heap profiling and explicit garbage tracking layers."
      ]
    }
  ],

  projects: [
    {
      name: "Brotli Edge Compressor Toolkit",
      projectLink: "https://github.com",
      projStart: "Jun-2024",
      projEnd: "Aug-2024",
      summary: "Open-source zero-dependency serverless compression utility.",
      highlights: [
        "Developed custom binary buffer stream pipelines leveraging WebCrypto subtle APIs to compress configuration assets natively.",
        "Grew organic repository engagement to 1.2k GitHub stars and handled package distributions across 40k production downloads."
      ]
    }
  ],

  degrees: [
    { collegeName: "University of California, Berkeley", degree: "Bachelor of Science", specialization: "Computer Science & Engineering", eduStart: "2016", eduEnd: "2020" }
  ],

  certifications: [
    { certName: "AWS Certified Solutions Architect – Professional", certInstitute: "Amazon Web Services", certDate: "Nov-2024" },
    { certName: "Certified Kubernetes Administrator (CKA)", certInstitute: "The Linux Foundation", certDate: "May-2025" }
  ],

  skillsList: [
    { name: "Languages", highlights: ["JavaScript (ESNext)", "TypeScript", "GoLang", "Python", "SQL", "HTML5/CSS3"] },
    { name: "Frameworks & Libs", highlights: ["React 18/19", "Next.js", "Vite", "Node.js", "Express", "TailwindCSS", "Vitest"] },
    { name: "Cloud & Devops", highlights: ["Docker", "Kubernetes", "AWS (S3, Lambda, CloudFront)", "Cloudflare Pages", "GitHub Actions"] }
  ],

  otherLinks: [
    { label: "Technical Blog", url: "https://dev.to" }
  ],

  references: [
    { name: "Sarah Connor", title: "VP of Engineering", company: "Cyberdyne Labs", contact: "sarah.c@cyberdynelabs.io" }
  ],

  awards: [
    { title: "Outstanding Technical Innovation Award", issuer: "Stark Tech Engineering Guild", date: "Dec-2024", summary: "Awarded for pioneering client-side edge streaming compression pipelines across core workspace nodes." }
  ],

//   customSections: [
//     {
//       heading: "Speaking Engagements",
//       items: [
//         { title: "Keynote Technical Presenter", subtitle: "JS Conf Widescreen 2025", highlights: ["Delivered a masterclass on browser native client-side CompressionStream APIs to 500+ on-site senior tech leads."] }
//       ]
//     }
//   ],

  sectionOrder: ["summary", "competencies", "experience", "projects", "education", "skills", "certifications", "awards", "references", "Speaking Engagements"],
  selectedFontSize: 13,
  selectedLineHeight: 1.5,
  selectedSectionMargin: 12,
  selectedFont: "sans",
  selectedLayout: "classic",
  headlineColor: "#4f46e5",
  showBranding: true
};
