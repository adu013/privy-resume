import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ColorPicker from "../components/ColorPicker";
import { vi, describe, test, expect } from "vitest";

describe("ColorPicker Theme Preset Engine", () => {

  test("triggers onInputChange handler smoothly when a user clicks a preset color circle", () => {
    const mockOnInputChange = vi.fn();

    // Render the updated color picker panel containing the clickable swatches
    render(
      <ColorPicker
        resumeData={{ headlineColor: "#4f46e5" }}
        onInputChange={mockOnInputChange}
      />
    );

    // Grabs all preset circle buttons inside the panel [INDEX]
    const colorSwatches = screen.getAllByRole("button");
    expect(colorSwatches.length).toBeGreaterThan(0);

    // Simulate User Action: Click the second theme circle option (Slate Corporate - #1e3a8a) [INDEX]
    fireEvent.click(colorSwatches[1]);

    // Assert: Verify the callback fires smoothly to handle the hex update [INDEX]
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);
  });

});
