import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import AwardsForm from "../../components/AwardsForm";

describe("AwardsForm Subsystem Matrix", () => {
  const setupMockProps = () => {
    return {
      resumeData: {
        awards: [
          {
            title: "Employee of the Year",
            issuer: "Google Inc.",
            date: "Dec 2025",
            summary: "Recognized out of 500+ engineers for driving core system reliability."
          }
        ]
      },
      onInputChange: vi.fn(),
      onAddItem: vi.fn(),
      onRemoveItem: vi.fn()
    };
  };

  test("renders existing awards data parameters into form fields cleanly", () => {
    const props = setupMockProps();
    render(<AwardsForm {...props} />);

    // Verify section heading title matches
    expect(screen.getByText("11. Awards & Achievements")).toBeInTheDocument();

    // Verify input fields are hydrated with correct initial value assertions
    expect(screen.getByDisplayValue("Employee of the Year")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Google Inc.")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Dec 2025")).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Recognized out of 500\+ engineers/i)).toBeInTheDocument();
  });

  test("triggers onInputChange callback when fields within an award card are modified", () => {
    const props = setupMockProps();
    render(<AwardsForm {...props} />);

    const titleInput = screen.getByDisplayValue("Employee of the Year");

    // Simulate user altering award title text parameter
    fireEvent.change(titleInput, { target: { value: "Outstanding Tech Innovator" } });

    expect(props.onInputChange).toHaveBeenCalledTimes(1);
    expect(props.onInputChange).toHaveBeenCalledWith({
      target: {
        name: "awards",
        value: [
          {
            title: "Outstanding Tech Innovator",
            issuer: "Google Inc.",
            date: "Dec 2025",
            summary: "Recognized out of 500+ engineers for driving core system reliability."
          }
        ]
      }
    });
  });

  test("dispatches onAddItem with the correct blank template schema when clicking Add button", () => {
    const props = setupMockProps();
    render(<AwardsForm {...props} />);

    const addBtn = screen.getByRole("button", { name: /\+ Add New Award/i });
    fireEvent.click(addBtn);

    expect(props.onAddItem).toHaveBeenCalledTimes(1);
    // Verifies it registers exactly the array key name and the pristine template blueprint shape
    expect(props.onAddItem).toHaveBeenCalledWith("awards", {
      title: "",
      issuer: "",
      date: "",
      summary: ""
    });
  });

  test("dispatches onRemoveItem with proper target index parameters when removal button is clicked", () => {
    const props = setupMockProps();

    // Inject multiple items so the remove button conditional block handles validation triggers cleanly
    props.resumeData.awards.push({
      title: "Accidental Duplicate Entry",
      issuer: "Test Corp",
      date: "Jan 2026",
      summary: "Stray card row."
    });

    render(<AwardsForm {...props} />);

    // Grab all removal buttons and fire a trigger click onto the second index node element card
    const removeButtons = screen.getAllByRole("button", { name: /✕ Remove Award/i });
    fireEvent.click(removeButtons[0]);

    expect(props.onRemoveItem).toHaveBeenCalledTimes(1);
    expect(props.onRemoveItem).toHaveBeenCalledWith("awards", 0);
  });

  test("completely hides the individual remove button control if only one award card item remains", () => {
    const props = setupMockProps(); // Contains exactly 1 award card entry inside setup arrays
    render(<AwardsForm {...props} />);

    const removeBtn = screen.queryByRole("button", { name: /✕ Remove Award/i });
    expect(removeBtn).not.toBeInTheDocument();
  });
});
