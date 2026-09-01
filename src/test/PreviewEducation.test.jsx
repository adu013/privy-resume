import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewEducation from "../components/preview/PreviewEducation";

describe("PreviewEducation Canvas Render Engine", () => {

  test("returns an empty flex box layout and skips headlines when degrees list is empty", () => {
    // Arrange: Setup empty initial state matching the exact keys [INDEX]
    const blankMockData = {
      degrees: [{ collegeName: "", degree: "", specialization: "", eduStart: "", eduEnd: "" }]
    };

    // Act: Render the node container into jsdom virtual DOM canvas
    const { container } = render(<PreviewEducation resumeData={blankMockData} />);

    // Assert: Verifies that the nested section heading text does NOT mount to the tree [INDEX]
    const heading = screen.queryByText(/Education/i);
    expect(heading).not.toBeInTheDocument();
  });

  test("renders the full Education header and item text cleanly when valid data exists", () => {
    // Arrange: Setup populated data context matching the exact file properties [INDEX]
    const activeMockData = {
      degrees: [
        {
          collegeName: "Tech University",
          degree: "B.S.",
          specialization: "Computer Science",
          eduStart: "2021",
          eduEnd: "2025"
        }
      ]
    };

    // Act: Render the component node tree
    render(<PreviewEducation resumeData={activeMockData} />);

    // Assert: Verify headings and text fragments mount into the visible tree [INDEX]
    const sectionHeading = screen.getByText("Education");
    const collegeText = screen.getByText(/Tech University/i);
    const degreeText = screen.getByText(/B\.S\./i);
    const timelineText = screen.getByText(/2021 — 2025/i);

    expect(sectionHeading).toBeInTheDocument();
    expect(collegeText).toBeInTheDocument();
    expect(degreeText).toBeInTheDocument();
    expect(timelineText).toBeInTheDocument();
  });

});
