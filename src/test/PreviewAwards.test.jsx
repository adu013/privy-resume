import React from "react";
import { render, screen } from "@testing-library/react";
import PreviewAwards from "../components/preview/PreviewAwards";
import { describe, test, expect } from "vitest";

describe("PreviewAwards Conditional Layout Engine", () => {

  test("returns null and renders absolutely nothing when awards data list is empty", () => {
    // Arrange: Setup empty/blank data mock parameters
    const blankMockData = {
      awards: [{ title: "", issuer: "", date: "", summary: "" }]
    };

    // Act: Render the node container inside jsdom virtual DOM canvas
    const { container } = render(<PreviewAwards resumeData={blankMockData} />);

    // Assert: Verify the output is completely empty so no weird empty spaces show up
    expect(container.firstChild).toBeNull();
  });

  test("renders the full section title and item text cleanly when valid data exists", () => {
    // Arrange: Setup populated data context
    const activeMockData = {
      awards: [{ title: "Gold Medalist", issuer: "Tech University", date: "2025", summary: "Top of class" }]
    };

    // Act: Render the node container
    render(<PreviewAwards resumeData={activeMockData} />);

    // Assert: Verify headings and string contents mount into the visible text tree [INDEX]
    const sectionHeading = screen.getByText("Awards & Achievements");
    const awardTitle = screen.getByText(/Gold Medalist/i);
    const awardIssuer = screen.getByText(/Tech University/i);

    expect(sectionHeading).toBeInTheDocument();
    expect(awardTitle).toBeInTheDocument();
    expect(awardIssuer).toBeInTheDocument();
  });

});
