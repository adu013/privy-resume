# 🔒 PrivyResume

PrivyResume is a 100% client-side, serverless, and privacy-first resume builder. It runs entirely inside the user's web browser, meaning sensitive work history, contact details, and personal data stay locked on their computer and never touch an external server.

Built for maximum efficiency, total data ownership, and complete offline capability.

---

## 🚀 Key Features & Unique Selling Point (USP)

* **Zero Server Architecture:** No remote tracking, no login requirements, and no remote databases. Absolute data protection.
* **Browser Memory Engine:** Every keystroke is saved directly into the browser's local storage cache automatically. Work is preserved even if the tab is accidentally closed.
* **Structured Multi-Page Wizard:** Form inputs are split across 10 clean, navigable step-by-step panel categories for stress-free data entry.
* **Dynamic Multi-Item Arrays:** Supports adding infinite entries for jobs, projects, degrees, certifications, skills, and references.
* **Branded Custom PDF Engine:** Renders high-utility, standard corporate resumes in professional Helvetica font with locked 20mm margins on all pages.
* **Data Portability:** Users can back up their details onto their local drive by exporting a raw `.json` file, and reload it back into the app instantly.
* **Optional Watermark Toggle:** Includes an unselectable branding notice at the footer that users can switch off with a clean checkbox.

---

## 🛠️ Built With

* **React** – Component-driven front-end framework.
* **Vite** – Fast, local compilation and bundling engine.
* **Native JavaScript & CSS** – Written purely with standard web APIs to ensure zero package breaking points and 100% offline predictability.

---

## 📂 Project Architecture

The application uses a highly modular, decoupled component tree to ensure effortless debugging and seamless scaling:

```text
privy-resume/
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── app.css         # Main theme wrapper, landing page & forms UI
│   │       ├── preview.css     # On-screen A4 document sheet text typography
│   │       └── print.css       # Native @media print overrides for clean PDFs
│   ├── components/
│   │   ├── preview/            # Isolated document preview chunks
│   │   │   ├── PreviewEducation.jsx
│   │   │   ├── PreviewExperience.jsx
│   │   │   ├── PreviewHeader.jsx
│   │   │   ├── PreviewProjects.jsx
│   │   │   └── PreviewReferences.jsx
│   │   ├── CertificationForm.jsx
│   │   ├── CompetenciesForm.jsx
│   │   ├── ContactForm.jsx
│   │   ├── EducationForm.jsx
│   │   ├── ExperienceForm.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LinksForm.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── ReferencesForm.jsx
│   │   ├── ResumePreview.jsx  # Orchestrates preview layouts
│   │   ├── SkillsForm.jsx
│   │   └── Workspace.jsx      # Orchestrates wizard steps and controls
│   ├── App.jsx                # Main controller hub for state & file logic
│   └── main.jsx               # Global asset registration file
```

---

## ⚡ Quick Start Guide

To run PrivyResume locally on your computer, ensure you have **Node.js** and **npm** installed, then execute these commands in your terminal:

```bash
# 1. Clone or download your repository and move inside the workspace
cd privy-resume

# 2. Install React's internal components locally
npm install

# 3. Spin up the local offline development server
npm run dev
```

Open `http://localhost:5173` in your browser to build your private resume!

---

## 🖨️ PDF Generation Checklist

When exporting your resume using the **Download PDF / Print** button, match these configuration selections inside your browser's native window for the best results:
1. **Destination:** Save as PDF
2. **Margins:** Default *(Our custom style sheets manage the 20mm margins explicitly)*
3. **Headers & Footers:** Uncheck *(Strips away local file paths and website metadata rows)*

---

## ✍️ Credits

* **Core Application Architecture & Logic:** Designed and engineered by me, a privacy-focused developer, building tools that put users back in control of their private files.
* **Technical Engineering Assistant:** Collaboratively architected, modularized, and refined in real time alongside my helpful AI Peer (Gemini).
