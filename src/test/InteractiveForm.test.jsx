import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AwardsForm from "../components/AwardsForm";
import { vi } from "vitest";

describe("AwardsForm Interaction Engine", () => {

  test("triggers onAddItem callback handler smoothly when user clicks add button", () => {
    // Arrange: Setup initial single-item array data mock context
    const mockResumeData = {
      awards: [{ title: "Employee of the Month", issuer: "Corp", date: "2026", summary: "" }]
    };

    // Create high-utility mock spy tracking functions using Vitest
    const mockOnInputChange = vi.fn();
    const mockOnAddItem = vi.fn();
    const mockOnRemoveItem = vi.fn();

    // Act: Render the form controls onto jsdom virtual DOM canvas
    render(
      <AwardsForm
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
        onAddItem={mockOnAddItem}
        onRemoveItem={mockOnRemoveItem}
      />
    );

    // Look up the "+ Add New Award / Achievement" action button tag on the screen
    const addButton = screen.getByRole("button", { name: /\+ Add New Award/i });
    expect(addButton).toBeInTheDocument();

    // Simulate User Action: Trigger an authentic mouse click event on the button
    fireEvent.click(addButton);

    // Assert: Verify the core state manager received the execution command smoothly
    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    expect(mockOnAddItem).toHaveBeenCalledWith("awards", { title: "", issuer: "", date: "", summary: "" });
  });

});
