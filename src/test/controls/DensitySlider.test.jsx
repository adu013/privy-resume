import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import DensitySliders from "../../components/DensitySlider";

describe("DensitySliders Component Subsystem Matrix", () => {
  const setupMockProps = () => {
    return {
      resumeData: {
        selectedFontSize: 13,
        selectedLineHeight: 1.5,
        selectedSectionMargin: 12
      },
      onInputChange: vi.fn()
    };
  };

  test("renders slider value text readouts and base labels cleanly into the DOM view", () => {
    const props = setupMockProps();
    render(<DensitySliders {...props} />);

    // Verifies the master container label prints successfully
    expect(screen.getByText("Page-Density Layout Controllers")).toBeInTheDocument();

    // Verifies that values are correctly read from props and formatted with indicators
    expect(screen.getByText("13px")).toBeInTheDocument();
    expect(screen.getByText("1.5")).toBeInTheDocument();
    expect(screen.getByText("12px")).toBeInTheDocument();
  });

  test("dispatches parsed float values on selectedFontSize alterations", () => {
    const props = setupMockProps();
    render(<DensitySliders {...props} />);

    // Target-lock the range inputs using their standard native html accessibility role
    const sliders = screen.getAllByRole("slider");
    const fontSizeSlider = sliders[0]; // Target Text Size

    // Simulate user shifting text size to tight 11.5 setting
    fireEvent.change(fontSizeSlider, { target: { value: "11.5" } });

    expect(props.onInputChange).toHaveBeenCalledTimes(1);
    expect(props.onInputChange).toHaveBeenCalledWith({
      target: { name: "selectedFontSize", value: 11.5 } // Verifies successful conversion to number format
    });
  });

  test("dispatches parsed float values on selectedLineHeight alterations", () => {
    const props = setupMockProps();
    render(<DensitySliders {...props} />);

    const sliders = screen.getAllByRole("slider");
    const lineHeightSlider = sliders[1]; // Target Line Spacing

    // Simulate shifting line spacing to comfortable 1.75 setting
    fireEvent.change(lineHeightSlider, { target: { value: "1.75" } });

    expect(props.onInputChange).toHaveBeenCalledTimes(1);
    expect(props.onInputChange).toHaveBeenCalledWith({
      target: { name: "selectedLineHeight", value: 1.75 }
    });
  });

  test("dispatches parsed float values on selectedSectionMargin alterations", () => {
    const props = setupMockProps();
    render(<DensitySliders {...props} />);

    const sliders = screen.getAllByRole("slider");
    const marginSlider = sliders[2]; // Target Section Gaps

    // Simulate shifting section margins down to 6px setting
    fireEvent.change(marginSlider, { target: { value: "6" } });

    expect(props.onInputChange).toHaveBeenCalledTimes(1);
    expect(props.onInputChange).toHaveBeenCalledWith({
      target: { name: "selectedSectionMargin", value: 6 }
    });
  });
});
