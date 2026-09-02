import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import Workspace from "../../components/Workspace";

// Mock nested layout dependencies to focus purely on the toolbar button integration tracking
vi.mock("../../components/preview/ResumePreview", () => ({
  default: () => <div data-testid="mock-preview">Canvas</div>
}));
vi.mock("../../components/controls/ProfileSwitcher", () => ({
  default: () => <div>Switcher Card</div>
}));

describe("Workspace Autofill Subsystem Engine", () => {
  const setupBaseProps = () => {
    return {
      resumeData: { fullName: "", sectionOrder: [] },
      profiles: {},
      activeProfileName: "Default Profile",
      onSwitchProfile: () => {},
      onCreateProfile: () => {},
      onDeleteProfile: () => {},
      onCloneProfile: () => {},
      onRenameProfile: () => {},
      onInputChange: () => {},
      onClearForm: () => {},
      onBack: () => {},
      onAddItem: () => {},
      onRemoveItem: () => {},
      onAddHighlight: () => {},
      onRemoveHighlight: () => {},
      onAddProjHighlight: () => {},
      onRemoveProjHighlight: () => {},
      onAddSkillHighlight: () => {},
      onRemoveSkillHighlight: () => {},
      onExportJSON: () => {},
      onImportJSON: () => {},
      onShareDeepLink: () => {},
      isSharedView: false,
      onExitPreview: () => {},
      onLoadDemoProfile: vi.fn() // Injects tracker directly into the autofill layer
    };
  };

  test("dispatches onLoadDemoProfile trigger callback when the Autofill button element is clicked", () => {
    const props = setupBaseProps();
    render(<Workspace {...props} />);

    // Target-Lock: Find your new custom button by its text string signature
    const demoButton = screen.getByRole("button", { name: /✨ Load Demo Profile/i });
    expect(demoButton).toBeInTheDocument();

    // Simulate User Action: Fire a native click event handler loop
    fireEvent.click(demoButton);

    // Assert: Verify the execution loop registers exactly 1 invocation parameter
    expect(props.onLoadDemoProfile).toHaveBeenCalledTimes(1);
  });
});
