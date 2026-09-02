import React, { useState, useEffect } from "react";

export default function ProfileSwitcher({
  profiles, activeProfileName, onSwitch, onCreate, onDelete,
  onRenameProfile, onCloneProfile
}) {
  const [newProfileName, setNewProfileName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [renameInput, setRenameInput] = useState(activeProfileName);

  const profileList = Object.keys(profiles);

  // Keep the input sync'd perfectly when profiles shift in the dropdown
  useEffect(() => {
    setRenameInput(activeProfileName);
  }, [activeProfileName]);

  // SUBMIT CREATE HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    onCreate(newProfileName.trim());
    setNewProfileName("");
  };

  // SUBMIT SAVE RENAME HANDLER
  const handleSaveRename = (e) => {
    e.preventDefault();
    if (!renameInput.trim()) return;
    onRenameProfile(renameInput.trim());
    setIsEditing(false);
  };

  return (
    <div
      className="profile-switcher-wrapper"
      style={{
        marginBottom: "20px",
        padding: "16px",
        backgroundColor: "#0b1329",
        borderRadius: "8px",
        border: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}
    >
      {/* LABEL FOR PROFILE SWITCHER */}
      <label style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        📁 Resume Profile Switcher
      </label>

      {/* Dynamic combined Control Row (Zero layout duplication) */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {isEditing ? (
          /* ✏️ ACTIVE INLINE RENAME TEXT CELL */
          <div style={{ display: "flex", gap: "4px", flex: 1 }}>
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              style={{
                flex: 1, padding: "6px 10px", borderRadius: "6px",
                backgroundColor: "#070d19", border: "1px solid #a855f7", color: "white", fontSize: "13px"
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={handleSaveRename}
              style={{ padding: "6px 10px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
            >
              ✓
            </button>
            <button
              type="button"
              onClick={() => { setIsEditing(false); setRenameInput(activeProfileName); }}
              style={{ padding: "6px 10px", backgroundColor: "#475569", color: "#cbd5e1", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ) : (
          /* 🔍 STANDARD DROPDOWN SELECTOR VIEW */
          <>
            <select
              value={activeProfileName}
              onChange={(e) => onSwitch(e.target.value)}
              style={{
                flex: 1, padding: "8px", borderRadius: "6px",
                backgroundColor: "#070d19", border: "1px solid #1e293b", color: "white", fontSize: "13px", fontWeight: "600", cursor: "pointer"
              }}
            >
              {profileList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

            {/* Inline Rename Trigger Action Button */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              style={{
                padding: "8px 10px", borderRadius: "6px", backgroundColor: "rgba(148, 163, 184, 0.1)",
                border: "1px solid #475569", color: "#94a3b8", fontSize: "12px", cursor: "pointer"
              }}
              title="Rename active profile"
            >
              ✏️
            </button>
          </>
        )}

        {/* PROFILE CLONE BUTTON */}
        <button
          type="button"
          onClick={onCloneProfile}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "rgba(79, 70, 229, 0.15)",
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

        {/* PROFILE DELETE BUTTON */}
        {profileList.length > 1 && !isEditing && (
          <button
            type="button"
            onClick={() => onDelete(activeProfileName)}
            style={{
              padding: "8px 12px",
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

      {/* FORM TO ADD NEW ACCOUNT */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "6px" }}>
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="New Profile Name (e.g. Backend React Lead)"
          style={{
            flex: 1, padding: "6px 10px", borderRadius: "4px",
            backgroundColor: "#070d19", border: "1px solid #1e293b", color: "white", fontSize: "12px"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 12px", borderRadius: "4px", backgroundColor: "#4f46e5",
            border: "none", color: "white", fontSize: "12px", fontWeight: "600", cursor: "pointer"
          }}
        >
          + Add
        </button>
      </form>
    </div>
  );
}
