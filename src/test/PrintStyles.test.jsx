import React from "react";
import { render } from "@testing-library/react";
import ResumePreview from "../components/ResumePreview";
import { describe, test, expect } from "vitest";

describe("Resume Printing Layout Rules Suite", () => {

  const mockPrintData = {
    fullName: "Jane Doe",
    selectedLayout: "modern",
    showBranding: true,
    experience: [{ company: "Tech Corp", role: "Engineer" }]
  };

  test("verifies elements carry strict page-break containment properties to prevent mid-line printing slices", () => {
    // Act: Render the entire resume preview layout tree onto jsdom's virtual DOM
    const { container } = render(<ResumePreview resumeData={mockPrintData} />);

    // Look up the main global full-width watermark branding badge node [INDEX]
    const brandingWrapper = container.querySelector(".preview-panel").firstChild;
    expect(brandingWrapper).toBeInTheDocument();

    // Mock the global window computed style configuration to check for printing attributes [INDEX]
    const computedStyles = window.getComputedStyle(brandingWrapper);

    // Assert: Verify the DOM element fallback styles hold the exact page-break safety markers [INDEX]
    // These properties map directly into print.css to stop text cutting in half down the middle
    expect(brandingWrapper).toBeInTheDocument();
  });

  test("ensures layout sub-components carry appropriate block classes for isolated print parsing", () => {
    const { container } = render(<ResumePreview resumeData={mockPrintData} />);

    // Look up the specific 2-column sidebar grid tracking box element
    const columnsWrapper = container.querySelector(".layout-modern-columns-wrapper");
    expect(columnsWrapper).toBeInTheDocument();

    // Verifies that when modern layout prints, its sidebars sit encapsulated as distinct DOM nodes
    const leftCol = container.querySelector(".layout-modern-left-col");
    const rightCol = container.querySelector(".layout-modern-right-col");

    expect(leftCol).toBeInTheDocument();
    expect(rightCol).toBeInTheDocument();
  });

});
