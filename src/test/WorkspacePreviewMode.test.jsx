import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import Workspace from "../components/Workspace";

// Mock the child sub-components to isolate Workspace tracking behaviors
vi.mock("../components/ResumePreview", () => ({
  default: () => <div data-testid="mock-resume-preview">A4 Canvas Canvas</div>
}));
vi.mock("../components/ProfileSwitcher", () => ({
  default: () => <div>Switcher Card</div>
}));

describe("Workspace Presentation View Router Engine", () => {

  const setupBaseProps = () => {
    return {
      resumeData: { fullName: "Bruce Banner", sectionOrder: [] },
      profiles: {},
      activeProfileName: "Default",
      onSwitchProfile: () => {},
      onCreateProfile: () => {},
      onDeleteProfile: () => {},
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
      isSharedView: true, // Force Public Read-Only Portfolio Preview View Mode Active
      onExitPreview: vi.fn()
    };
  };

  test("hides standard input forms entirely and shows minimalist portfolio header when in shared mode", () => {
    const props = setupBaseProps();
    render(<Workspace {...props} />);

    // Asserts public read-only headline banner mounts into center view frame
    expect(screen.getByText(/INTERACTIVE PORTFOLIO WORKSPACE/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download PDF \/ Print Resume/i })).toBeInTheDocument();

    // Verifies forms step indicator tabs and button text definitions are completely hidden
    expect(screen.queryByText("1. Identity")).not.toBeInTheDocument();
    expect(screen.queryByText("← Previous Section")).not.toBeInTheDocument();
  });

  test("fires onExitPreview callback modifier when editor navigation button is clicked", () => {
    const props = setupBaseProps();
    render(<Workspace {...props} />);

    const editorLinkBtn = screen.getByRole("button", { name: /Open in Full Resume Editor/i });
    fireEvent.click(editorLinkBtn);

    // Verifies clicking successfully calls the hook to lift the layout block mask corridor boundaries
    expect(props.onExitPreview).toHaveBeenCalledTimes(1);
  });

});
