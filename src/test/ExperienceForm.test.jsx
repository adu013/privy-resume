import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import ExperienceForm from "../components/ExperienceForm";

describe("ExperienceForm Subsystem Matrix Engine", () => {

    // TEST SCENARIO: 1
  test("triggers onInputChange handler with target attributes on text modification", () => {
    // Arrange: Setup explicit data structures matching the exact parameters
    const mockResumeData = {
      jobs: [
        {
          company: "Stark Industries",
          companyLink: "https://company.com",
          jobTitle: "Senior Software Engineer",
          country: "USA",
          jobStart: "Jan-2026",
          jobEnd: "Present",
          highlights: ["Line Item 1"]
        }
      ]
    };

    const mockOnInputChange = vi.fn();

    // Act: Render with explicit prop labels so resumeData can never be undefined
    render(
      <ExperienceForm
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
        onAddHighlight={() => {}}
        onRemoveHighlight={() => {}}
      />
    );

    // Target-locks your brand-new Company Website URL input field box natively by its placeholder
    const urlInput = screen.getByPlaceholderText("https://company.com");
    expect(urlInput).toBeInTheDocument();

    // Simulate Action: Trigger a clean input alteration change event
    fireEvent.change(urlInput, { target: { name: "companyLink", value: "https://starkenterprises.com" } });

    // Assert: Verify the precise handler captures it with row parameters intact
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);

    // Validates matching argument tracking signatures
    const [firstCall] = mockOnInputChange.mock.calls;
    const [eventObj, index, sliceKey] = firstCall;

    expect(index).toBe(0);
    expect(sliceKey).toBe("jobs");
    expect(eventObj).toBeDefined();
  });

  // TEST SCENARIO: 2
  test("dispatches onAddHighlight trigger when description button is clicked", () => {
    const mockResumeData = {
      jobs: [{ company: "Test", jobTitle: "", country: "", jobStart: "", jobEnd: "", highlights: [""] }]
    };
    const mockOnAddHighlight = vi.fn();

    render(
      <ExperienceForm
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
      jobs: [{ company: "Test", jobTitle: "", country: "", jobStart: "", jobEnd: "", highlights: [""] }]
    };
    const mockOnAddItem = vi.fn();

    render(
      <ExperienceForm
        resumeData={mockResumeData}
        onInputChange={() => {}}
        onAddItem={mockOnAddItem}
        onRemoveItem={() => {}}
        onAddHighlight={() => {}}
        onRemoveHighlight={() => {}}
      />
    );

    const addJobBtn = screen.getByRole("button", { name: /\+ Add Another Company/i });
    fireEvent.click(addJobBtn);

    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    expect(mockOnAddItem).toHaveBeenCalledWith("jobs", expect.any(Object));
  });

});
