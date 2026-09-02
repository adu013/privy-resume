import React, { useState } from "react";

export default function CustomSectionForm({
  customSections, onAddSection, onChange, onAddItem, onAddHighlight, onRemoveHighlight
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

      {/* SECTION CREATION CARD MATCHING YOUR STANDARD CONTAINER BLOCK */}
      <form
        onSubmit={handleCreate}
        style={{
          display: "flex",
          gap: "10px",
          padding: "16px",
          backgroundColor: "#0b1329",
          borderRadius: "8px",
          border: "1px solid #1e293b",
          marginBottom: "24px"
        }}
      >
        <div className="input-group" style={{ flex: 1 }}>
          <input
            type="text"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            placeholder="Create Bespoke Section Heading (e.g., Speaking Engagements)"
            className="form-input"
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          style={{
            padding: "10px 20px",
            background: "linear-gradient(to right, #9333ea, #4f46e5)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          + Add Section
        </button>
      </form>

      {/* RENDER DYNAMIC CUSTOM SECTIONS CARD BLOCKS */}
      {customSections?.map((section, sIdx) => (
        <div
          key={sIdx}
          style={{
            marginBottom: "28px",
            padding: "20px",
            backgroundColor: "rgba(168, 85, 247, 0.03)", /* Subtle dynamic violet hue border background */
            borderRadius: "8px",
            border: "1px solid #a855f7"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(168, 85, 247, 0.2)", paddingBottom: "8px" }}>
            <h4 style={{ color: "#c084fc", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
              🌐 Dynamic Section: {section.heading}
            </h4>
          </div>

          {/* ITEM ENTRIES REPEATABLE LOOP */}
          {section.items.map((item, iIdx) => (
            <div
              key={iIdx}
              style={{
                marginBottom: "20px",
                padding: "16px",
                backgroundColor: "#0b1329",
                borderRadius: "8px",
                border: "1px solid #1e293b",
                position: "relative"
              }}
            >
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Entry Title / Role</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => onChange(e, sIdx, iIdx, "title")}
                    placeholder="Keynote Tech Presenter"
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Subtitle / Organisation</label>
                  <input
                    type="text"
                    value={item.subtitle || ""}
                    onChange={(e) => onChange(e, sIdx, iIdx, "subtitle")}
                    placeholder="JS Conf 2026"
                    className="form-input"
                  />
                </div>
              </div>

              {/* HIGHLIGHT DESCRIPTION BULLET LINE INPUTS LOOP */}
              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <label className="input-label">Accomplishments & Bullet Descriptions</label>
                {item.highlights?.map((bullet, bIdx) => (
                    /* FLEX PACKAGING CELL ROW: Placed input and delete cross button anchors side-by-side cleanly */
                    <div key={bIdx} style={{ display: "flex", gap: "8px", alignItems: "center", width: "100%" }}>
                      <input
                        type="text"
                        value={bullet || ""}
                        onChange={(e) => onChange(e, sIdx, iIdx, "highlights", bIdx)}
                        placeholder="Describe specific technical contribution or milestone..."
                        className="form-input"
                        style={{ flex: 1, marginBottom: 0 }}
                      />

                      {/* Compact clean deletion anchor tag revealed when more than one bullet line sits active */}
                      {item.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemoveHighlight(sIdx, iIdx, bIdx);
                          }}
                          className="btn-danger"
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid #ef4444",
                            color: "#f87171",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "700"
                          }}
                          title="Delete this line element row"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                ))}

                <button
                  type="button"
                  onClick={() => onAddHighlight(sIdx, iIdx)}
                  style={{
                    alignSelf: "end",
                    fontSize: "11px",
                    color: "#a855f7",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    marginTop: "2px"
                  }}
                >
                  + Add Description Line
                </button>
              </div>
            </div>
          ))}

          {/* ATTACH NEW SUB-ITEM CARD BUTTON */}
          <button
            type="button"
            onClick={() => onAddItem(sIdx)}
            className="btn-secondary"
            style={{ width: "100%", padding: "10px", fontWeight: "600" }}
          >
            + Add New Entry to "{section.heading}"
          </button>
        </div>
      ))}
    </div>
  );
}
