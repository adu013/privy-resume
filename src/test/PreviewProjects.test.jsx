import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewProjects from "../components/preview/PreviewProjects";

describe("PreviewProjects Canvas Render Engine", () => {

  test("skips rendering section elements when engineering projects list is empty", () => {
    // Arrange: Setup an empty initial state matching the exact schema
    const blankMockData = {
      projects: [{ name: "", summary: "", projStart: "", projEnd: "", projectLink: "", highlights: [] }]
    };

    // Act: Render the node container into jsdom virtual DOM canvas
    render(<PreviewProjects resumeData={blankMockData} />);

    // Assert: Verifies that the nested section heading text does NOT mount to the tree
    const heading = screen.queryByText(/Projects/i);
    expect(heading).not.toBeInTheDocument();
  });

  test("renders project name, vertical partition, and light hyperlinks successfully when projectLink is present", () => {
    // Arrange: Setup populated data context matching the exact file properties
    const activeMockData = {
      projects: [
        {
          name: "Privy Resume Sandbox",
          summary: "A privacy-first serverless local workspace.",
          projStart: "2024",
          projEnd: "2026",
          projectLink: "https://github.com",
          highlights: ["Engineered client-side state models."]
        }
      ]
    };

    // Act: Render the component node tree
    render(<PreviewProjects resumeData={activeMockData} />);

    // Assert: Verify headings and text fragments mount into the visible tree
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Privy Resume Sandbox")).toBeInTheDocument();
    expect(screen.getByText("|")).toBeInTheDocument(); // Verifies the vertical divider text node splits elements

    // Verifies that the URL renders inside an authentic anchor link selector node with the exact href
    const linkElement = screen.getByRole("link", { name: "https://github.com" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("https://github.com");

    // Verify bullet lists rendering
    expect(screen.getByText(/Engineered client-side state models/i)).toBeInTheDocument();
  });

});
