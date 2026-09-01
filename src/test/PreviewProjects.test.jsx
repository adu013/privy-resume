import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewProjects from "../components/preview/PreviewProjects";

describe("PreviewProjects Canvas Render Engine", () => {

  test("skips rendering section elements when engineering projects list is empty", () => {
    // Arrange: Setup empty initial state matching the exact schema [INDEX]
    const blankMockData = {
      projects: [{ name: "", summary: "", projStart: "", projEnd: "", highlights: [] }]
    };

    // Act: Render the node container into jsdom virtual DOM canvas
    const { container } = render(<PreviewProjects resumeData={blankMockData} />);

    // Assert: Verifies that the nested section heading text does NOT mount to the tree [INDEX]
    const heading = screen.queryByText(/Projects/i);
    expect(heading).not.toBeInTheDocument();
  });

  test("renders full technical project card parameters flawlessly on screen", () => {
    // Arrange: Setup populated project data tracking your exact keys [INDEX]
    const activeMockData = {
      projects: [
        {
          name: "Privy Resume Sandbox",
          summary: "A privacy-first serverless local layout optimization compiler workspace.",
          projStart: "2024",
          projEnd: "2026",
          highlights: ["Engineered client-side state models.", "Optimized print tracking sheets."]
        }
      ]
    };

    // Act: Render the component node tree
    render(<PreviewProjects resumeData={activeMockData} />);

    // Assert: Verify headings and text fragments mount into the visible tree [INDEX]
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText(/Privy Resume Sandbox/i)).toBeInTheDocument();
    expect(screen.getByText(/A privacy-first serverless local layout optimization compiler workspace/i)).toBeInTheDocument();
    expect(screen.getByText(/2024 — 2026/i)).toBeInTheDocument();

    // Verify bullet items list rendering
    expect(screen.getByText(/Engineered client-side state models/i)).toBeInTheDocument();
    expect(screen.getByText(/Optimized print tracking sheets/i)).toBeInTheDocument();
  });

});
