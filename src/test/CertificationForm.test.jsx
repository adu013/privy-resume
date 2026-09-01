import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import CertificationForm from "../components/CertificationForm";

describe("CertificationForm Interaction Engine", () => {

  test("triggers onInputChange successfully when a user types a certification name", () => {
    // Arrange: Setup initial mock data representing your state model
    const mockResumeData = {
      certifications: [{ certName: "AWS Certified Architect", certInstitute: "Amazon", certDate: "2026" }]
    };
    const mockOnInputChange = vi.fn();

    // Act: Render the form controls into the virtual DOM sandbox [INDEX]
    const { container } = render(
      <CertificationForm
        resumeData={mockResumeData}
        onInputChange={mockOnInputChange}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
      />
    );

    // Target-locks the first input box natively [INDEX]
    const certNameInput = container.querySelector('input') || screen.getAllByRole("textbox")[0];
    expect(certNameInput).toBeInTheDocument();

    // Simulate User Action: Type a fresh certification name string [INDEX]
    fireEvent.change(certNameInput, { target: { value: "Google Cloud Professional" } });

    // Assert: Verify the input state successfully triggered the callback loop [INDEX]
    expect(mockOnInputChange).toHaveBeenCalled();
  });

});
