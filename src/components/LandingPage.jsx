import React from "react";

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      {/* GLOWING BACKGROUND SHAPES */}
      <div className="glow-container">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      {/* HEADER SECTION */}
      <header className="header">
        <div className="logo-area">
          <div className="logo-icon">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: "white" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="logo-text">
            Privy<span className="logo-highlight">Resume</span>
          </h1>
        </div>
        <div className="badge">
          <div className="badge-dot"></div>
          100% Offline App
        </div>
      </header>

      {/* HERO / MAIN BODY */}
      <main className="hero">
        <div className="usp-pill">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Your data stays on your computer. Period.</span>
        </div>

        <h2>
          Build a stunning resume. <br />
          <span className="text-gradient">Keep your privacy intact.</span>
        </h2>
        <p>
          PrivyResume runs entirely in your browser. No accounts to create. No remote databases. Your work history, contact info, and private details never touch a server.
        </p>

        <button className="btn-primary" onClick={onStart}>
          Get Started Free
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon-box">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3>Browser Storage Only</h3>
            <p>Every keystroke is saved directly to your browser's local cache. Close the tab anytime; your progress stays safely on your computer.</p>
          </div>

          <div className="feature-card">
            <div className="card-icon-box">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3>Absolute Ownership</h3>
            <p>Because there is no backend server, it is impossible for your data to leak in a data breach or be sold to third-party companies.</p>
          </div>

          <div className="feature-card">
            <div className="card-icon-box">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3>Local Data Exports</h3>
            <p>Export your details as a raw `.json` file to keep a backup on your hard drive. Load it back instantly whenever you want to update it.</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} PrivyResume. Designed for total data privacy.
      </footer>
    </div>
  );
}
