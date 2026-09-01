import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SectionShuffler from "../components/SectionShuffler";
import { vi, describe, test, expect } from "vitest";

describe("SectionShuffler Pristine Priority Engine", () => {

  test("successfully swaps section positions in the master state array when a shuffling arrow is clicked", () => {
    // Arrange: Setup your exact, unified 9-section master array framework
    const mockResumeData = {
      sectionOrder: ["summary", "competencies", "experience", "projects", "education", "skills", "certifications", "awards", "references"]
    };
    const mockOnInputChange = vi.fn();

    // Act: Render your streamlined SectionShuffler panel into jsdom [INDEX]
    render(
      <SectionShuffler
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
      />
    );

    // Find the shifting down arrow buttons (▼) on screen [INDEX]
    const downButtons = screen.getAllByText("▼");
    expect(downButtons.length).toBeGreaterThan(0);

    // Simulate Action: Click the very first down arrow button to shift "summary" downwards [INDEX]
    fireEvent.click(downButtons[0]);

    // Assert: Verify the prop handler fires once with the perfectly rearranged array matrix [INDEX]
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);
    expect(mockOnInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "sectionOrder",
          value: ["competencies", "summary", "experience", "projects", "education", "skills", "certifications", "awards", "references"] // 🔒 Swapped perfectly!
        })
      })
    );
  });

});
