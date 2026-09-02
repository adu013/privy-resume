import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ResumePreview from "../ResumePreview";

export default function WorkspacePublicPreview({ resumeData, onExitPreview }) {

  const [isTimeoutError, setIsTimeoutError] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // 🔒 30-Second Safety Timeout Window
  useEffect(() => {
    if (resumeData && resumeData.fullName) return;

    const safetyTimeoutId = setTimeout(() => {
      setIsTimeoutError(true);
    }, 30000);

    return () => clearTimeout(safetyTimeoutId);
  }, [resumeData]);

  // 🔒 5-Second Chronological Home Redirection
  useEffect(() => {
    if (!isTimeoutError) return;

    if (countdown <= 0) {
      window.location.assign(window.location.pathname);
      return;
    }

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimeoutError, countdown]);

  // 🛡️ Safe hydration guard check: Runs while data settles or triggers error deck
  if (!resumeData || !resumeData.fullName) {
    return (
      <div className="public-preview-hydrate-fallback" style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#020617", color: "white", fontFamily: "system-ui, sans-serif", position: "relative", overflow: "hidden", padding: "24px", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "20%", left: "30%", width: "300px", height: "300px", background: "rgba(79, 70, 229, 0.15)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "20%", right: "30%", width: "300px", height: "300px", background: "rgba(168, 85, 247, 0.15)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }}></div>

        <div className="logo-area" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", zIndex: 10 }}>
          <div className="logo-icon" style={{ backgroundColor: "#4f46e5", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: "white" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="logo-text" style={{ fontSize: "24px", fontWeight: "800", color: "white", margin: 0, letterSpacing: "-0.5px" }}>
            Privy<span className="logo-highlight" style={{ color: "#a855f7" }}>Resume</span>
          </h1>
        </div>

        {isTimeoutError ? (
          /* 🚨 REVEALED TIMEOUT AND REDIRECTION CONTAINER */
          <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", padding: "16px 24px", borderRadius: "8px", marginBottom: "24px", maxWidth: "460px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f87171", marginBottom: "6px", marginTop: 0 }}>⚠️ Invalid or Corrupted Link</h2>
              <p style={{ fontSize: "13px", color: "#cbd5e1", margin: 0, lineHeight: "1.5" }}>The profile link is missing character keys or failed to decompress inside the client browser sandbox.</p>
            </div>
            <p style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "600", marginBottom: "24px" }}>
              Redirecting you to the PrivyResume homepage in <span style={{ color: "#a855f7", fontSize: "16px", fontWeight: "800" }}>{countdown}</span> seconds...
            </p>
          </div>
        ) : (
          /* ✨ ACTIVE LOADING PANEL SPIN LAYER */
          <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid rgba(168, 85, 247, 0.1)", borderTop: "3px solid #a855f7", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "24px" }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#cbd5e1" }}>Hydrating Resume Profile...</h2>
            <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "420px", lineHeight: "1.6", marginBottom: "32px" }}>We are decrypting and unpacking your secure compressed portfolio data stream entirely inside your browser's memory sandbox.</p>
          </div>
        )}

        <button type="button" onClick={() => window.location.assign(window.location.pathname)} style={{ padding: "10px 20px", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "6px", color: "#cbd5e1", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: "8px", zIndex: 10, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#334155"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e293b"; e.currentTarget.style.color = "#cbd5e1"; }}>
          ← Return to PrivyResume Home
        </button>
      </div>
    );
  }


  // 🔒 NATIVE JAVASCRIPT VIEWPORT DE-CONSTRAINER ENGINE
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "PrivyResume";

    const scrollWrapper = document.querySelector(".public-preview-scroll-wrapper") ||
                          document.querySelector('div[style*="overflowY: auto"]') ||
                          document.querySelector('div[style*="overflow-y: auto"]');

    const rootWrapper = document.querySelector(".public-preview-root") ||
                        (scrollWrapper ? scrollWrapper.parentElement : null);

    const originalRootStyle = rootWrapper ? rootWrapper.getAttribute("style") : "";
    const originalScrollStyle = scrollWrapper ? scrollWrapper.getAttribute("style") : "";

    if (rootWrapper) {
      rootWrapper.style.height = "auto";
      rootWrapper.style.minHeight = "initial";
      rootWrapper.style.display = "block";
    }
    if (scrollWrapper) {
      scrollWrapper.style.height = "auto";
      scrollWrapper.style.overflow = "visible";
      scrollWrapper.style.overflowY = "visible";
      scrollWrapper.style.display = "block";
    }

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
      if (rootWrapper) rootWrapper.setAttribute("style", originalRootStyle);
      if (scrollWrapper) scrollWrapper.setAttribute("style", originalScrollStyle);
    }, 150);
  };

  return (
    <div className="public-preview-root" style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#020617" }}>

      {/* Floating Portfolio Top Utility Dashboard */}
      <div className="workspace-header" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 28px",
        backgroundColor: "#0b1329",
        borderBottom: "1px solid #1e293b",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
        width: "100%"
      }}>
        {/* BRANDING LOGO */}
        <div className="logo-area" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="logo-icon" style={{ backgroundColor: "#4f46e5", padding: "6px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: "white" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="logo-text" style={{ fontSize: "18px", fontWeight: "700", color: "white", margin: 0, letterSpacing: "-0.5px" }}>
            Privy<span className="logo-highlight" style={{ color: "#a855f7" }}>Resume</span>
          </h1>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handlePrint}
            style={{ padding: "8px 16px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "12px" }}
          >
            🖨️ Download PDF / Print Resume
          </button>

          <button
            onClick={onExitPreview}
            style={{ padding: "8px 14px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
          >
            🛠️ Open in Full Resume Editor →
          </button>
        </div>
      </div>

      {/* Centered Widescreen Canvas Area */}
      <div className="public-preview-scroll-wrapper" style={{ flex: 1, overflowY: "auto", padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "start", width: "100%" }}>
        <div className="public-preview-content-box" style={{ width: "100%", maxWidth: "850px" }}>
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>

    </div>
  );
}
