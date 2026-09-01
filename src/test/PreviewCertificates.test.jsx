import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PreviewCertificates from "../components/preview/PreviewCertificates";

describe("PreviewCertificates Canvas Render Engine", () => {

  test("returns null and renders absolutely nothing when certifications list is blank", () => {
    // 1. Arrange: Setup empty initial state data block matching your app schema
    const blankMockData = {
      certifications: [{ certName: "", certInstitute: "", certDate: "" }]
    };

    // 2. Act: Render the node container into jsdom virtual DOM canvas
    const { container } = render(<PreviewCertificates resumeData={blankMockData} />);

    // 3. Assert: Verify the container output is completely empty so no orphan titles render [INDEX]
    expect(container.firstChild).toBeNull();
  });

  test("renders the full Certifications header and item text cleanly when valid data exists", () => {
    // Arrange: Setup populated data context matching your exact keys
    const activeMockData = {
      certifications: [
        { certName: "AWS Solutions Architect", certInstitute: "Amazon", certDate: "2026" }
      ]
    };

    // Act: Render the component node tree
    render(<PreviewCertificates resumeData={activeMockData} />);

    // Assert: Verify headings and text fragments mount into the visible tree [INDEX]
    const sectionHeading = screen.getByText("Certifications");
    const certTitle = screen.getByText(/AWS Solutions Architect/i);
    const certIssuer = screen.getByText(/Amazon/i);
    const certDate = screen.getByText("2026");

    expect(sectionHeading).toBeInTheDocument();
    expect(certTitle).toBeInTheDocument();
    expect(certIssuer).toBeInTheDocument();
    expect(certDate).toBeInTheDocument();
  });

});
