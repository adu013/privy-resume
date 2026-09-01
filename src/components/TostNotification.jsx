import React from "react";

export default function ToastNotification({ toast }) {
  if (!toast.show) return null;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      backgroundColor: toast.type === "error" ? "#ef4444" : "#10b981",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "13px",
      fontWeight: "600",
      fontFamily: "sans-serif",
      pointerEvents: "none",
      animation: "slideDownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
    }}>
      {/* Dynamic Key Icon Indicator Box */}
      <span>{toast.message}</span>

      {/* Embedded CSS Keyframes for smooth layout performance */}
      <style>{`
        @keyframes slideDownFadeIn {
          from {
            top: -50px;
            opacity: 0;
          }
          to {
            top: 20px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
