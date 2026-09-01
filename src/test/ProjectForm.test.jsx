import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import ProjectForm from "../components/ProjectForm";

describe("ProjectForm Subsystem Matrix Engine", () => {

  // TEST SCENARIO: 1
  test("triggers onInputChange handler with target attributes on text modification", () => {
    // Arrange: Setup explicit data structures matching the exact parameters
    const mockResumeData = {
      projects: [
        {
          name: "E-Commerce Engine",
          projectLink: "https://github.com",
          projStart: "Jan-2026",
          projEnd: "Aug-2026",
          summary: "Overview...",
          highlights: ["Line Item 1"]
        }
      ]
    };

    const mockOnInputChange = vi.fn();

    // Act: Render with explicit prop labels so resumeData can never be undefined
    render(
      <ProjectForm
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
        onAddHighlight={() => {}}
        onRemoveHighlight={() => {}}
      />
    );

    // Explicitly find the input field with your exact placeholder text layout
    const nameInput = screen.getByPlaceholderText("E-Commerce Offline Engine");
    expect(nameInput).toBeInTheDocument();

    // Simulate Action: Trigger a clean input alteration change event
    fireEvent.change(nameInput, { target: { name: "name", value: "New Custom Title" } });

    // Assert: Verify your precise handler captures it with row parameters intact
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);

    // Verifies that row index 0 and section token "projects" match perfectly
    const [firstCall] = mockOnInputChange.mock.calls;
    const [eventObj, index, sliceKey] = firstCall;

    expect(index).toBe(0);
    expect(sliceKey).toBe("projects");
    expect(eventObj).toBeDefined();
  });

  // TEST SCENARIO: 2
  test("dispatches onAddHighlight trigger when description button is clicked", () => {
    const mockResumeData = {
      projects: [{ name: "Test Proj", projectLink: "", projStart: "", projEnd: "", summary: "", highlights: [""] }]
    };
    const mockOnAddHighlight = vi.fn();

    render(
      <ProjectForm
        resumeData={mockResumeData}
        onInputChange={() => {}}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
        onAddHighlight={mockOnAddHighlight}
        onRemoveHighlight={() => {}}
      />
    );

    const addLineBtn = screen.getByRole("button", { name: /\+ Add Description Line/i });
    fireEvent.click(addLineBtn);

    expect(mockOnAddHighlight).toHaveBeenCalledTimes(1);
    expect(mockOnAddHighlight).toHaveBeenCalledWith(0);
  });

  // TEST SCENARIO: 3
  test("dispatches onAddItem trigger when root factory button is clicked", () => {
    const mockResumeData = {
      projects: [{ name: "Test Proj", projectLink: "", projStart: "", projEnd: "", summary: "", highlights: [""] }]
    };
    const mockOnAddItem = vi.fn();

    render(
      <ProjectForm
        resumeData={mockResumeData}
        onInputChange={() => {}}
        onAddItem={mockOnAddItem}
        onRemoveItem={() => {}}
        onAddHighlight={() => {}}
        onRemoveHighlight={() => {}}
      />
    );

    const addProjBtn = screen.getByRole("button", { name: /\+ Add Another Project/i });
    fireEvent.click(addProjBtn);

    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    expect(mockOnAddItem).toHaveBeenCalledWith("projects", expect.any(Object));
  });

});
