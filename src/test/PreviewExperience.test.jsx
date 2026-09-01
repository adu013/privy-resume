import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewExperience from "../components/preview/PreviewExperience";

describe("PreviewExperience Canvas Render Engine", () => {

  test("skips rendering section elements when jobs list is blank", () => {
    // Arrange: Setup empty initial state matching the exact schema [INDEX]
    const blankMockData = {
      jobs: [{ company: "", jobTitle: "", jobStart: "", jobEnd: "", country: "", highlights: [] }]
    };

    // Act: Render the node container into jsdom virtual DOM canvas
    render(<PreviewExperience resumeData={blankMockData} />);

    // Assert: Verifies that the nested section heading text does NOT mount to the tree [INDEX]
    const heading = screen.queryByText(/Work Experiences/i);
    expect(heading).not.toBeInTheDocument();
  });

  test("renders full work experience item details accurately when valid tracking data exists", () => {
    // Arrange: Setup populated project data tracking the exact keys [INDEX]
    const activeMockData = {
      jobs: [
        {
          company: "Stark Enterprises",
          jobTitle: "Systems Architect",
          country: "USA",
          jobStart: "2023",
          jobEnd: "Present",
          highlights: ["Engineered scalable cloud infrastructure pipelines.", "Optimized offline systems."]
        }
      ]
    };

    // Act: Render the component node tree
    render(<PreviewExperience resumeData={activeMockData} />);

    // Assert: Verify headings and text fragments mount into the visible tree [INDEX]
    expect(screen.getByText("Work Experiences")).toBeInTheDocument();
    expect(screen.getByText(/Systems Architect/i)).toBeInTheDocument();
    expect(screen.getByText(/Stark Enterprises, USA/i)).toBeInTheDocument();
    expect(screen.getByText(/2023 — Present/i)).toBeInTheDocument();

    // Verify bullet lists rendering [INDEX]
    expect(screen.getByText(/Engineered scalable cloud infrastructure pipelines/i)).toBeInTheDocument();
    expect(screen.getByText(/Optimized offline systems/i)).toBeInTheDocument();
  });

});
