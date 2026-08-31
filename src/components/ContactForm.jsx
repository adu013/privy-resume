import React from "react";
import ColorPicker from "./ColorPicker";
import DensitySliders from "./DensitySlider";
import FontSwitcher from "./FontSwitcher";
import LayoutSwitcher from "./LayoutSwitcher";

export default function ContactForm({ resumeData, onInputChange }) {
  return (
    <div>
      <h3 className="form-section-title">1. Contact & Identity</h3>
      <div className="form-grid" style={{ marginTop: "14px" }}>
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input
            type="text" name="fullName" value={resumeData.fullName}
            onChange={onInputChange} placeholder="John Doe" className="form-input"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input
            type="email" name="email" value={resumeData.email}
            onChange={onInputChange} placeholder="john@example.com" className="form-input"
          />
        </div>
        <div className="input-group" style={{ marginTop: "10px" }}>
          <label className="input-label">Phone Number</label>
          <input
            type="text" name="phone" value={resumeData.phone}
            onChange={onInputChange} placeholder="+1 (555) 019-2834" className="form-input"
          />
        </div>
        <div className="input-group" style={{ marginTop: "10px" }}>
          <label className="input-label">Location / City</label>
          <input
            type="text" name="location" value={resumeData.location}
            onChange={onInputChange} placeholder="New York, NY" className="form-input"
          />
        </div>
      </div>

      {/* 🎨 Color Picker */}
      <ColorPicker resumeData={resumeData} onInputChange={onInputChange} />

      {/* Layout Switcher */}
      <LayoutSwitcher resumeData={resumeData} onInputChange={onInputChange} />

      {/* Font Switcher */}
      <FontSwitcher resumeData={resumeData} onInputChange={onInputChange} />

      {/* Density Slider */}
      <DensitySliders resumeData={resumeData} onInputChange={onInputChange} />

      {/* PrivyResume branding toggle box */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px",
        backgroundColor: "rgba(168, 85, 247, 0.05)",
        borderRadius: "8px",
        border: "1px dashed rgba(168, 85, 247, 0.2)"
      }}>
        <input
          type="checkbox"
          id="showBranding"
          name="showBranding"
          checked={resumeData.showBranding !== false} // Safe true-by-default fallback
          onChange={onInputChange}
          style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#a855f7" }}
        />
        <label htmlFor="showBranding" style={{ fontSize: "13px", color: "#cbd5e1", cursor: "pointer", userSelect: "none" }}>
          Show "Built with PrivyResume" badge at the footer of the PDF
        </label>
      </div>
    </div>
  );
}
