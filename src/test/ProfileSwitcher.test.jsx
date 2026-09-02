import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import ProfileSwitcher from "../components/ProfileSwitcher";

describe("ProfileSwitcher Component Subsystem Matrix", () => {
  const setupMockProps = () => {
    return {
      profiles: {
        "Default Profile": { fullName: "John Doe" },
        "React Lead Focus": { fullName: "John Dev" }
      },
      activeProfileName: "Default Profile",
      onSwitch: vi.fn(),
      onCreate: vi.fn(),
      onDelete: vi.fn(),
      onRenameProfile: vi.fn(), // ✏️ Added Rename mock spy
      onCloneProfile: vi.fn()    // 📄 Added Clone mock spy
    };
  };

  test("renders all available accounts inside the option dropdown elements cleanly", () => {
    const props = setupMockProps();
    render(<ProfileSwitcher {...props} />);

    // Verifies the header label text mounts successfully to the virtual DOM tree
    expect(screen.getByText(/Resume Profile Switcher/i)).toBeInTheDocument();

    // Verifies that both configured profile names appear as options
    expect(screen.getByRole("option", { name: "Default Profile" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "React Lead Focus" })).toBeInTheDocument();
  });

  test("triggers onSwitch callback handler when a different dropdown option is selected", () => {
    const props = setupMockProps();
    render(<ProfileSwitcher {...props} />);

    const selectDropdown = screen.getByRole("combobox");

    // Simulate user selecting a different profile account option
    fireEvent.change(selectDropdown, { target: { value: "React Lead Focus" } });

    expect(props.onSwitch).toHaveBeenCalledTimes(1);
    expect(props.onSwitch).toHaveBeenCalledWith("React Lead Focus");
  });

  test("dispatches onCreate callback handler with trimmed string value when submitting new profile form", () => {
    const props = setupMockProps();
    render(<ProfileSwitcher {...props} />);

    const inputField = screen.getByPlaceholderText(/New Profile Name/i);
    const addButton = screen.getByRole("button", { name: /\+ Add/i });

    // Simulate typing a new account profile name with surrounding spaces to verify trimming behavior
    fireEvent.change(inputField, { target: { value: "  Backend Architect Focus  " } });
    fireEvent.click(addButton);

    expect(props.onCreate).toHaveBeenCalledTimes(1);
    expect(props.onCreate).toHaveBeenCalledWith("Backend Architect Focus");
  });

  test("dispatches onDelete trigger with the active profile name parameter when cross button element is clicked", () => {
    const props = setupMockProps();
    render(<ProfileSwitcher {...props} />);

    const deleteButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(deleteButton);

    expect(props.onDelete).toHaveBeenCalledTimes(1);
    expect(props.onDelete).toHaveBeenCalledWith("Default Profile");
  });

  test("completely hides the delete button control element if only one profile account remains", () => {
    const props = setupMockProps();
    // Override profile dictionary to simulate a single remaining account profile configuration
    props.profiles = { "Sole Profile": { fullName: "Lone Ranger" } };
    props.activeProfileName = "Sole Profile";

    render(<ProfileSwitcher {...props} />);

    const deleteButton = screen.queryByRole("button", { name: "✕" });
    expect(deleteButton).not.toBeInTheDocument();
  });

  /* TEST INLINE PROFILE RENAME SUITE */
  test("toggles inline edit cell input mode and fires onRenameProfile handler on save", () => {
    const props = setupMockProps();
    render(<ProfileSwitcher {...props} />);

    // Target-lock and click your pencil edit icon button
    const renameTriggerBtn = screen.getByTitle("Rename active profile");
    fireEvent.click(renameTriggerBtn);

    // Verify select box disappears and the text cell mounts directly into the tree
    const renameInput = screen.getByDisplayValue("Default Profile");
    expect(renameInput).toBeInTheDocument();

    // Modify rename value parameters and save via checkmark action item button
    fireEvent.change(renameInput, { target: { value: "Senior Frontend Engineer" } });
    const saveButton = screen.getByText("✓");
    fireEvent.click(saveButton);

    expect(props.onRenameProfile).toHaveBeenCalledTimes(1);
    expect(props.onRenameProfile).toHaveBeenCalledWith("Senior Frontend Engineer");
  });

  /* NEW REPLICABLE CLONE ACCENT TESTING INJECTIONS */
  test("dispatches onCloneProfile trigger callback when the Clone button element is clicked", () => {
    const props = setupMockProps();
    render(<ProfileSwitcher {...props} />);

    const cloneButton = screen.getByTitle(/Clone \/ Duplicate active profile dataset/i);
    fireEvent.click(cloneButton);

    expect(props.onCloneProfile).toHaveBeenCalledTimes(1);
  });
});
