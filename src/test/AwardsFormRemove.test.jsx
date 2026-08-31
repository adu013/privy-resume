import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AwardsForm from "../components/AwardsForm";
import { vi, describe, test, expect } from "vitest";

describe("AwardsForm Item Removal Engine", () => {

  test("successfully triggers onRemoveItem callback when the remove button is clicked", () => {
    // Arrange: Setup mock data with TWO items so the remove buttons render on screen
    const mockResumeData = {
      awards: [
        { title: "First Award", issuer: "Company A", date: "2025", summary: "" },
        { title: "Second Award", issuer: "Company B", date: "2026", summary: "" }
      ]
    };

    // Create tracking spy listener functions using Vitest
    const mockOnInputChange = vi.fn();
    const mockOnAddItem = vi.fn();
    const mockOnRemoveItem = vi.fn();

    // Act: Render the form controls into jsdom virtual DOM canvas
    render(
      <AwardsForm
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
        onAddItem={mockOnAddItem}
        onRemoveItem={mockOnRemoveItem}
      />
    );

    // Look up the "✕ Remove Award" action button tag on the screen [INDEX]
    // Since there are two awards, it will find multiple remove buttons. We'll grab the first one.
    const removeButtons = screen.getAllByRole("button", { name: /Remove Award/i });
    expect(removeButtons[0]).toBeInTheDocument();

    // Simulate User Action: Trigger an authentic mouse click event on the first remove button [INDEX]
    fireEvent.click(removeButtons[0]);

    // Assert: Verify the core state manager received the extraction command smoothly
    expect(mockOnRemoveItem).toHaveBeenCalledTimes(1);

    // Confirms it requested to remove from the "awards" array at index position 0
    expect(mockOnRemoveItem).toHaveBeenCalledWith("awards", 0);
  });

});
