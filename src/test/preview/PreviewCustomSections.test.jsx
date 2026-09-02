import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewCustomSections from "../../components/preview/PreviewCustomSections";

describe("PreviewCustomSections Document Rendering Subsystem", () => {
  const setupBaseProps = () => {
    return {
      resumeData: {
        headlineColor: "#4f46e5",
        selectedFontSize: 13,
        selectedLineHeight: 1.5,
        selectedSectionMargin: 12,
        customSections: [
          {
            heading: "Speaking Engagements",
            items: [
              {
                title: "Keynote Technical Presenter",
                subtitle: "JS Conf Widescreen 2025",
                highlights: ["Delivered a masterclass on client-side streaming."]
              }
            ]
          }
        ]
      }
    };
  };

  test("renders custom heading layout title and matching metadata elements flawlessly", () => {
    const props = setupBaseProps();
    render(<PreviewCustomSections {...props} />);

    // Verifies that the heading title mounts into the preview canvas with perfect casing
    const sectionHeading = screen.getByText("Speaking Engagements");
    expect(sectionHeading).toBeInTheDocument();

    // Verifies role title and organization subtitle are mapped out side-by-side
    expect(screen.getByText("Keynote Technical Presenter")).toBeInTheDocument();
    expect(screen.getByText("JS Conf Widescreen 2025")).toBeInTheDocument();

    // Verifies description bullet text renders into the document list structure
    expect(screen.getByText("Delivered a masterclass on client-side streaming.")).toBeInTheDocument();
  });

  test("returns null and suppresses output entirely if customSections array parameter is empty", () => {
    const props = {
      resumeData: {
        customSections: []
      }
    };
    const { container } = render(<PreviewCustomSections {...props} />);

    // Asserts that no loose wrapping DOM nodes are printed into the document tree
    expect(container.firstChild).toBeNull();
  });

  test("skips printing individual custom cards if item attributes are blank", () => {
    const props = {
      resumeData: {
        customSections: [
          {
            heading: "Empty Section Block",
            items: [{ title: "", subtitle: "", highlights: [""] }]
          }
        ]
      }
    };
    const { container } = render(<PreviewCustomSections {...props} />);

    // Soft safeguard check: empty item blocks shouldn't compile empty headers onto paper
    expect(screen.queryByText("Empty Section Block")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });
});
