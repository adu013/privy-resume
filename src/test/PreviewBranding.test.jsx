import React from "react";
import { render, screen } from "@testing-library/react";
import PreviewBranding from "../components/preview/PreviewBranding";

describe("PreviewBranding Component", () => {

  test("renders the branding watermark text when showBranding is true", () => {
    const mockData = { showBranding: true };

    render(<PreviewBranding resumeData={mockData} isModern={false} />);

    // Verifies that the branding string text exists on the page
    const watermarkText = screen.getByText("This resume is built using PrivyResume!");
    expect(watermarkText).toBeInTheDocument();
  });

  test("returns null and does not render anything when showBranding is false", () => {
    const mockData = { showBranding: false };

    const { container } = render(<PreviewBranding resumeData={mockData} isModern={false} />);

    // Verifies that the component output wrapper is completely empty
    expect(container.firstChild).toBeNull();
  });

});
