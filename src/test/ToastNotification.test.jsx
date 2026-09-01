import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ToastNotification from "../components/TostNotification";

describe("ToastNotification Subsystem Render Engine", () => {

  test("returns null and renders absolutely nothing when show attribute is false", () => {
    // 1. Arrange: Pass a hidden toast configuration state
    const mockToast = { show: false, message: "Hidden", type: "success" };

    // 2. Act: Render the component into jsdom
    const { container } = render(<ToastNotification toast={mockToast} />);

    // 3. Assert: Verify the tree remains completely empty
    expect(container.firstChild).toBeNull();
  });

  test("renders an emerald success alert banner cleanly when show is active", () => {
    // 1. Arrange: Setup an active success state structure
    const mockToast = { show: true, message: "✓ Data backup loaded!", type: "success" };

    // 2. Act: Mount the alert node
    render(<ToastNotification toast={mockToast} />);

    // 3. Assert: Verify your message text fragment mounts into the visible tree
    const alertMessage = screen.getByText("✓ Data backup loaded!");
    expect(alertMessage).toBeInTheDocument();
  });

});
