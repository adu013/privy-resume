import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LayoutSwitcher from "../components/LayoutSwitcher";
import { vi, describe, test, expect } from "vitest";

describe("LayoutSwitcher Control Panel", () => {

  test("triggers onInputChange with modern value when clicking the Modern layout button", () => {
    // Arrange: Setup mock properties
    const mockResumeData = { selectedLayout: "classic" };
    const mockOnInputChange = vi.fn();

    // Act: Render the visual switch component into jsdom
    render(
      <LayoutSwitcher
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
      />
    );

    // Look up the "Modern Split" layout toggle button on screen [INDEX]
    const modernButton = screen.getByRole("button", { name: /Modern/i });
    expect(modernButton).toBeInTheDocument();

    // Simulate Action: Trigger a clean user mouse click on the button
    fireEvent.click(modernButton);

    // Assert: Verify the parent state listener received the switch event flawlessly
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);
    expect(mockOnInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "selectedLayout",
          value: "modern"
        })
      })
    );
  });

});
