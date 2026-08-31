# 🔒 PrivyResume (v1.2.1)

PrivyResume is a production-ready, open-source, **100% serverless, client-side resume workbench engine**. Built explicitly for security-conscious software engineers, developers, and tech professionals, it compiles standard Markdown-ready background fields into beautiful, ATS-optimized, high-density resumes without exposing personal metadata to tracking databases.

🚀 **Live Production Workspace:** [https://privy-resume.traxrep.com](https://://traxrep.com/)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org)
![Node version](https://img.shields.io/badge/node.js-339933)
![React Version](https://img.shields.io/badge/-ReactJs-61DAFB)
[![Cloudflare Build Badge](https://cloudflare-build-badge.xeffen25.com/Xeffen25/cloudflare-build-badge/status.svg)](https://cloudflare-build-badge.xeffen25.com/Xeffen25/cloudflare-build-badge/status.svg)

---

## 🛠️ Core Architectural Philosophy

Traditional resume builders process candidate data on remote servers, opening windows for unauthorized profile tracking, search engine caching, and data harvesting. PrivyResume runs entirely in your local runtime memory context:

* **Zero External Databases:** Data is stored locally using standard browser `localStorage` slots. It never crosses the network array.
* **Bi-Directional JSON Hub:** Complete workflow autonomy. Users can download their raw background state metrics as a localized `.json` backup file and re-import it instantly later to seed the configuration panel from an absolute blank slate.
* **Segregated Multi-Template Engine:** Decoupled UI routing layers isolate separate display parameters, ensuring layout adjustments inside a template never leak properties or corrupt alternate views.

---

## 💎 Advanced Features Engine

* **11-Step Modular Setup Wizard:** Covers everything from basic Identification, Executive Profiles, History, Education, and Certifications, up to technical Project blocks, Custom Reference tracks, and an isolated *Awards & Achievements* module.
* **Instant Dynamic Theme Color Picker:** Injects CSS custom properties dynamically, allowing real-time, on-screen adjustments to headline accents and borders.
* **Multi-Template Toggle System:**
  * `📄 Classic View`: Traditional, single-column stacked chronological layout designed for high-density reading in standard corporate environments.
  * `📊 Modern Split View`: Tech-focused, multi-column corporate look that pushes fast-lookup technical metrics (Skills, Competencies, References) into a clean left sidebar, leaving the main wider track free to detail heavy employment narratives.
* **Toggleable Branding Watermark Footer:** An isolated, global full-width canvas component that can be toggled on or off via checkbox inputs.

---

## 🖨️ Engineered Print Layout Sinc (Firefox Optimized)

Most template engines collapse during PDF export due to how print sub-systems interpret responsive web layouts. PrivyResume bypasses these limitations using explicit **millimeter tracking grids (`mm`)** and **Percentage-Based Flexbox boundaries** mapped into isolated layout sheets:

* **Strict WYSIWYG Mirroring:** Media query definitions strip away app dashboard sidebars and sync paper parameters to an exact physical **A4 standard portrait canvas (210mm x 297mm)**.
* **Firefox Print Engine Patch:** Leverages CSS `display: contents !important;` to bypass known Firefox print engine margin compression bugs, keeping headers full-width and layout sidebars perfectly side-by-side on paper sheets.
* **Safe Page-Break Controls:** Embedded `page-break-inside: avoid !important;` logic prevents individual paragraph lines, list elements, or section headings from splitting in half at page margins.

---

## 🏗️ Folder Directory Structure

The repository is built to follow a strict modular, component-driven structural hierarchy:

```text
src/
├── assets/
│   └── css/
│       ├── app.css              # Main web app layout & landing framework
│       ├── preview.css          # Shared interactive onscreen preview settings
│       ├── print.css            # Base global printable settings & overrides
│       ├── layout-classic.css   # Onscreen Classic stacked styling rules
│       ├── layout-modern.css    # Onscreen Modern 2-column sidebar rules
│       ├── print-classic.css    # Isolated printable Classic rules
│       └── print-modern.css    # Isolated printable Modern sidebar rules
├── components/
│   ├── Workspace.jsx            # Main app workflow layout orchestrator
│   ├── ResumePreview.jsx        # Top-level preview wrapper shell
│   ├── ContactForm.jsx          # Setup wizard panel forms ...
│   ├── AwardsForm.jsx           # Section 11 form inputs processor
│   └── preview/                 # Decoupled presentation layout files
│       ├── ClassicLayout.jsx    # Classic rendering node
│       ├── ModernLayout.jsx     # Modern 2-column rendering node
│       ├── PreviewHeader.jsx    # Full-width centered identity header
│       ├── PreviewCompetencies.jsx
│       ├── PreviewSkills.jsx
│       ├── PreviewReferences.jsx
│       └── PreviewBranding.jsx  # Global full-width watermark badge
└── main.jsx                     # Global assets index registration pipeline
```

---

## 🚀 Local Installation & Developer Workflow

To clone this repository and spin up a local development workbench sandbox environment on your machine:

```bash
# 1. Clone the open-source repository
git clone https://github.com/adu013/privy-resume.git

# 2. Step inside the root project directory
cd privy-resume

# 3. Install the required Node dependencies package stream
npm install

# 4. Boot up the local Vite hot-reloading development server
npm run dev
```

Open `http://localhost:5173` in your browser to begin testing modifications.

### Compiling Production-Ready Assets
To compress JavaScript modules, tree-shake dead code lines, and compile clean stylesheets for live distribution:
```bash
npm run build
```
Output build files compile safely straight inside the localized `/dist` folder.

---

## ☁️ Continuous Automated Deployment

This project uses an automated CI/CD pipeline integrated directly with **Cloudflare Pages**:
* Every code push or merge event targeting the `main` branch triggers an immediate cloud-side compilation.
* Builds execute using the environment flag configuration **`NODE_VERSION: 20`** to support Vite's asset packing pipeline requirements.
* Built production directories deploy instantly onto a secure, edge-network production domain environment within seconds.

---

## 📄 License & Compliance

Distributed under the **MIT License**. See the `LICENSE` file in the root folder directory for more details. Copyright (c) 2026 Privy Resume.
