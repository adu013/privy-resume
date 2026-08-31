import React from "react";
import { render } from "@testing-library/react";
import ResumePreview from "../components/ResumePreview";

describe("ResumePreview CSS Custom Properties Mapping", () => {

  test("successfully injects dynamic layout values from state into inline CSS variables", () => {
    // Arrange: Setup custom density values inside a mock state footprint object
    const mockDensityData = {
      fullName: "Jane Doe",
      selectedLayout: "classic",
      selectedFontSize: 12.5,
      selectedLineHeight: 1.35,
      selectedSectionMargin: 10,
      showBranding: false
    };

    // Act: Render the preview element tree onto jsdom's virtual DOM
    const { container } = render(<ResumePreview resumeData={mockDensityData} />);

    // Look up the main preview-panel shell wrapper node in the HTML layout tree
    const panelWrapper = container.querySelector(".preview-panel");
    expect(panelWrapper).toBeInTheDocument();

    // Assert: Query the computed inline style strings to verify they map identically
    const styles = window.getComputedStyle(panelWrapper);

    expect(styles.getPropertyValue("--resume-font-size")).toBe("12.5px");
    expect(styles.getPropertyValue("--resume-line-height")).toBe("1.35");
    expect(styles.getPropertyValue("--resume-section-margin")).toBe("10px");
  });

});
