import React, { useState } from "react";

export default function ProfileSwitcher({
  profiles, activeProfileName, onSwitch, onCreate, onDelete,
  onCloneProfile
}) {
  const [newProfileName, setNewProfileName] = useState("");
  const profileList = Object.keys(profiles);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    onCreate(newProfileName.trim());
    setNewProfileName("");
  };

  return (
    <div style={{
      marginBottom: "20px",
      padding: "16px",
      backgroundColor: "#0b1329",
      borderRadius: "8px",
      border: "1px solid #1e293b",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        📁 Resume Profile Switcher
      </label>

      {/* Profile Dropdown Selector Bar & Removal Control */}
      <div style={{ display: "flex", gap: "8px" }}>
        <select
          value={activeProfileName}
          onChange={(e) => onSwitch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "#070d19",
            border: "1px solid #1e293b",
            color: "white",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {profileList.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {/* PROFILE CLONE ICON BUTTON */}
        <button
          type="button"
          onClick={onCloneProfile}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "rgba(79, 70, 229, 0.15)", // Subtle indigo translucent shade
            border: "1px solid #6366f1",
            color: "#818cf8",
            fontSize: "12px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          title="Clone / Duplicate active profile dataset"
          onMouseEnter={(e) => { e.target.style.backgroundColor = "rgba(79, 70, 229, 0.3)"; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = "rgba(79, 70, 229, 0.15)"; }}
        >
          📝 Clone
        </button>

        {profileList.length > 1 && (
          <button
            type="button"
            onClick={() => onDelete(activeProfileName)}
            style={{
              padding: "0 12px",
              borderRadius: "6px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid #ef4444",
              color: "#f87171",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer"
            }}
            title="Delete active profile"
          >
            ✕
          </button>
        )}
      </div>

      {/* Mini Inline Form Factory to Append New Account Profiles */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "6px" }}>
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="New Profile Name (e.g. Backend React Lead)"
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: "4px",
            backgroundColor: "#070d19",
            border: "1px solid #1e293b",
            color: "white",
            fontSize: "12px"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#4f46e5",
            border: "none",
            color: "white",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          + Add
        </button>
      </form>
    </div>
  );
}
