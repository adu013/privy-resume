import React, { useState } from "react";

export default function CustomSectionForm({
  customSections, onAddSection, onChange, onAddItem, onAddHighlight, onRemoveHighlight,
  onRemoveSection, onRemoveItem // 接收核心移除屬性方法
}) {
  const [newHeading, setNewHeading] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newHeading.trim()) return;
    onAddSection(newHeading.trim());
    setNewHeading("");
  };

  return (
    <div>
      <h3 className="form-section-title">12. Custom Workspace Blocks</h3>

      {/* SECTION CREATION CARD */}
      <form onSubmit={handleCreate} style={{ display: "flex", gap: "10px", padding: "16px", backgroundColor: "#0b1329", borderRadius: "8px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
          <input type="text" value={newHeading} onChange={(e) => setNewHeading(e.target.value)} placeholder="Bespoke Section Name (e.g., Speaking Engagements)" className="form-input" />
        </div>
        <button type="submit" className="btn-primary" style={{ padding: "10px 20px", background: "linear-gradient(to right, #9333ea, #4f46e5)", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}>
          + Add Section
        </button>
      </form>

      {/* RENDER USER-GENERATED CUSTOM SECTIONS LIST */}
      {customSections?.map((section, sIdx) => (
        <div key={sIdx} style={{ marginBottom: "36px", padding: "20px", backgroundColor: "rgba(15, 23, 42, 0.3)", borderRadius: "12px", border: "1px solid #334155" }}>

          {/* Dynamic Active Section Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #334155", paddingBottom: "10px" }}>
            <h4 style={{ color: "#a855f7", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
              🌐 Section: {section.heading}
            </h4>

            {/* FULL SECTION DESTRUCTION ACTION TRIGGER BUTTON ANCHOR */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`🚨 Are you completely sure you want to delete the entire custom section "${section.heading}" and everything inside it?`)) {
                  onRemoveSection(sIdx);
                }
              }}
              className="btn-danger"
              style={{ padding: "4px 10px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              ✕ Delete Section Block
            </button>
          </div>

          {/* ITEM REPEATABLE ENTRIES LOOP */}
          {section.items.map((item, iIdx) => (
            <div key={iIdx} style={{ marginBottom: "20px", padding: "16px", backgroundColor: "#0b1329", borderRadius: "8px", border: "1px solid #1e293b", position: "relative" }}>

              {/* Row 1: Title and Organization Grid */}
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Entry Title / Honor</label>
                  <input type="text" value={item.title || ""} onChange={(e) => onChange(e, sIdx, iIdx, "title")} placeholder="Keynote Tech Speaker" className="form-input" />
                </div>
                <div className="input-group">
                  <label className="input-label">Organization / Event</label>
                  <input type="text" value={item.subtitle || ""} onChange={(e) => onChange(e, sIdx, iIdx, "subtitle")} placeholder="JS Conf 2026" className="form-input" />
                </div>
              </div>

              {/* Row 2: Bullet Highlights Segment */}
              <div className="input-group" style={{ marginTop: "12px" }}>
                <label className="input-label">Brief Description Lines / Bullet Points</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                  {item.highlights?.map((bullet, bIdx) => (
                    <div key={bIdx} style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%" }}>
                      <input type="text" value={bullet || ""} onChange={(e) => onChange(e, sIdx, iIdx, "highlights", bIdx)} placeholder="Describe specific technical contribution or milestone..." className="form-input" style={{ flex: 1, marginBottom: 0 }} />

                      {item.highlights.length > 1 && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); onRemoveHighlight(sIdx, iIdx, bIdx); }} className="btn-danger" style={{ padding: "8px 12px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#f87171", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}>
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button type="button" onClick={() => onAddHighlight(sIdx, iIdx)} style={{ alignSelf: "end", fontSize: "11px", color: "#c084fc", backgroundColor: "transparent", border: "none", cursor: "pointer", fontWeight: "700", marginTop: "8px", display: "block", marginLeft: "auto" }}>
                  + Add Description Line
                </button>
              </div>

              {/* INDIVIDUAL ENTRY REPEATABLE CARD REMOVAL BUTTON ANCHOR (Matches AwardsForm button layout) */}
              {section.items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onRemoveItem(sIdx, iIdx); }}
                  className="btn-danger"
                  style={{ marginTop: "12px" }}
                >
                  ✕ Remove Entry Card
                </button>
              )}
            </div>
          ))}

          {/* ATTACH NEW SUB-ITEM CARD BUTTON */}
          <button type="button" onClick={() => onAddItem(sIdx)} className="btn-secondary" style={{ width: "100%", padding: "10px", fontWeight: "600" }}>
            + Add New Entry to "{section.heading}"
          </button>
        </div>
      ))}
    </div>
  );
}
