import React from "react";

export default function PreviewProjects({ resumeData }) {
  const projsList = resumeData.projects || [];
  if (!projsList.some(p => p.name)) return null;

  return (
    <div>
      <h4 className="resume-section-title">Projects</h4>
      {projsList.map((proj, idx) => {
        if (!proj.name) return null;

        // Custom Date Range String Builder Rules
        let dateDisplay = "";
        if (proj.projStart && !proj.projEnd) dateDisplay = `${proj.projStart} - present`;
        else if (!proj.projStart && proj.projEnd) dateDisplay = proj.projEnd;
        else if (proj.projStart && proj.projEnd) dateDisplay = `${proj.projStart} — ${proj.projEnd}`;

        return (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>

              {/** Project Link */}
              <div>
                <strong style={{ fontSize: "14px", color: "#0f172a" }}>{proj.name}</strong>

                {/* Only render the URL segment if projectLink text actually exists */}
                {proj.projectLink && (
                  <>
                    <span style={{ color: "#94a3b8", margin: "0 8px", fontSize: "13px" }}>|</span>
                    <a
                      href={proj.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "13px",
                        color: "#64748b", //
                        textDecoration: "none",
                        borderBottom: "1px dashed #cbd5e1"
                      }}
                    >
                      {proj.projectLink}
                    </a>
                  </>
                )}
              </div>

              {dateDisplay && <div style={{ fontSize: "12px", color: "#475569", fontWeight: "500" }}>{dateDisplay}</div>}
            </div>
            {proj.summary && <p className="resume-text" style={{ marginTop: "2px" }}>{proj.summary}</p>}
            {proj.highlights && proj.highlights.length > 0 && (
              <ul style={{ margin: "4px 0 0 0", paddingLeft: "18px", listStyleType: "disc" }}>
                {proj.highlights.map((bullet, bIdx) => bullet && <li key={bIdx} className="resume-text" style={{ fontSize: "12.5px" }}>{bullet}</li>)}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
