import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewSkills from "../components/preview/PreviewSkills";

describe("PreviewSkills Matrix Render Engine", () => {

  test("returns null and skips rendering headlines when skillsList is blank", () => {
    // Arrange: Setup empty initial state matching the exact schema [INDEX]
    const blankMockData = {
      skillsList: [{ name: "", highlights: [] }]
    };

    // Act: Render the node container into jsdom virtual DOM canvas
    const { container } = render(<PreviewSkills resumeData={blankMockData} isModern={false} />);

    // Assert: Verifies that the nested section heading text does NOT mount to the tree [INDEX]
    const heading = screen.queryByText(/Skills/i);
    expect(heading).not.toBeInTheDocument();
  });

  test("renders skills array block as a wide list row when isModern is false", () => {
    // Arrange: Setup populated classic row data matching the exact properties [INDEX]
    const activeMockData = {
      skillsList: [
        { name: "Languages", highlights: ["JavaScript", "Python", "Rust"] }
      ]
    };

    // Act: Render the component in Classic mode
    render(<PreviewSkills resumeData={activeMockData} isModern={false} />);

    // Assert: Verify headings and text fragments mount into the visible tree [INDEX]
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText(/Languages/i)).toBeInTheDocument();
    expect(screen.getByText(/JavaScript, Python, Rust/i)).toBeInTheDocument();
  });

  test("renders skills array cleanly as stacked sidebar lists when isModern is active", () => {
    // Arrange: Setup populated modern row data matching your exact properties [INDEX]
    const activeMockData = {
      skillsList: [
        { name: "Frameworks", highlights: ["React", "Vite", "Vitest"] }
      ]
    };

    // Act: Render the component in Modern sidebar mode
    render(<PreviewSkills resumeData={activeMockData} isModern={true} />);

    // Assert: Verify components map accurately inside the columns tracking tracks [INDEX]
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText(/Frameworks/i)).toBeInTheDocument();
    expect(screen.getByText(/React, Vite, Vitest/i)).toBeInTheDocument();
  });

});
