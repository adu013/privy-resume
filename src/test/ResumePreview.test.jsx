import React from "react";
import { render, screen } from "@testing-library/react";
import ResumePreview from "../components/ResumePreview";

describe("ResumePreview Layout Router Engine", () => {

  const baseMockData = {
    fullName: "John Doe",
    email: "john@example.com",
    summary: "Senior Software Engineer Profile Data",
    competencies: [{ name: "React" }],
    showBranding: true
  };

  test("correctly renders ClassicLayout components when classic is selected", () => {
    const classicMock = { ...baseMockData, selectedLayout: "classic" };

    const { container } = render(<ResumePreview resumeData={classicMock} />);

    // Asserts that the parent class name contains the classic layout handle selector
    expect(container.querySelector(".layout-classic")).toBeInTheDocument();
    // Asserts that the profile header text renders cleanly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("correctly injects ModernLayout column tracks when modern layout is active", () => {
    const modernMock = { ...baseMockData, selectedLayout: "modern" };

    const { container } = render(<ResumePreview resumeData={modernMock} />);

    // Asserts that the parent class switches to modern layout
    expect(container.querySelector(".layout-modern")).toBeInTheDocument();
    // Asserts that the specific 2-column wrapper box element is present in the DOM layout
    expect(container.querySelector(".layout-modern-columns-wrapper")).toBeInTheDocument();
  });

});
