import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import WorkspacePublicPreview from "../../components/workspace/WorkspacePublicPreview";

// 🔒 TARGET-LOCK INTERCEPTOR PATHWAY:
// This exact path string matches your component's local import literal perfectly!
vi.mock("../../components/ResumePreview", () => ({
  default: () => <div data-testid="mock-resume-preview">Mocked Resume Canvas</div>
}));

describe("WorkspacePublicPreview Presentation Engine Matrix", () => {
  let originalPrint;

  beforeEach(() => {
    originalPrint = window.print;
    window.print = vi.fn(); // Spy tracker to intercept browser print triggers
    vi.useFakeTimers();     // Steps through the title-restoring setTimeout loop
  });

  afterEach(() => {
    window.print = originalPrint;
    vi.useRealTimers();
  });

  const setupMockProps = () => {
    return {
      resumeData: {
        fullName: "Alex Mercer",
        email: "alex.mercer@devmail.io"
      },
      onExitPreview: vi.fn()
    };
  };

  test("renders stunning hydration fallback loading screen if profile data is empty or missing keys", () => {
    const props = setupMockProps();
    props.resumeData = null; // Simulate unhydrated cold-start payload state

    render(<WorkspacePublicPreview {...props} />);

    // Verifies loading spinners, status typography, and home safety buttons map cleanly
    expect(screen.getByText("Hydrating Resume Profile...")).toBeInTheDocument();
    expect(screen.getByText("← Return to PrivyResume Home")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-resume-preview")).not.toBeInTheDocument();
  });

  test("hydrates profile metrics successfully and mounts corporate header toolbelt branding items", () => {
    const props = setupMockProps();
    render(<WorkspacePublicPreview {...props} />);

    // Verifies your exact Landing Page styled logo token values
    expect(screen.getByText("Privy")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();

    // Verifies sub-nested A4 sheet document canvas reveals itself smoothly
    expect(screen.getByTestId("mock-resume-preview")).toBeInTheDocument();
  });

  test("triggers onExitPreview callback when clicking Open in Full Editor button", () => {
    const props = setupMockProps();
    render(<WorkspacePublicPreview {...props} />);

    const fullEditorBtn = screen.getByRole("button", { name: /🛠️ Open in Full Resume Editor/i });
    fireEvent.click(fullEditorBtn);

    expect(props.onExitPreview).toHaveBeenCalledTimes(1);
  });

  test("temporarily overrides browser title parameter to 'PrivyResume' during native print loop triggers", () => {
    const props = setupMockProps();
    document.title = "Original Browser Tab Title";

    render(<WorkspacePublicPreview {...props} />);

    const printBtn = screen.getByRole("button", { name: /🖨️ Download PDF \/ Print Resume/i });
    fireEvent.click(printBtn);

    // Assert: Check that window.print wrapper mechanism fires successfully
    expect(window.print).toHaveBeenCalledTimes(1);

    // Assert: Verify title swaps to signature branding text cleanly before execution
    expect(document.title).toBe("PrivyResume");

    // Fast-forward fake timers to execute the clean restoration loop macro cell
    act(() => {
      vi.advanceTimersByTime(150);
    });

    // Assert: Document page title reverts safely in the background post-print dialog exit
    expect(document.title).toBe("Original Browser Tab Title");
  });
});
