import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import ProfileSwitcher from "../components/ProfileSwitcher";

describe("ProfileSwitcher Clone Subsystem Engine", () => {

  test("dispatches onCloneProfile trigger callback when the Clone button element is clicked", () => {
    // Arrange: Setup mock property tracks matching the exact component requirements
    const mockProfiles = {
      "Default Profile": { fullName: "Tony Stark", sectionOrder: [] }
    };
    const mockOnCloneProfile = vi.fn();

    // Act: Render the component into the virtual JSDOM tree
    render(
      <ProfileSwitcher
        profiles={mockProfiles}
        activeProfileName="Default Profile"
        onSwitch={() => {}}
        onCreate={() => {}}
        onDelete={() => {}}
        onCloneProfile={mockOnCloneProfile} // Inject directly
      />
    );

    // Target-Lock: Find the new custom page clone button by its text signature
    const cloneButton = screen.getByRole("button", { name: /📝 Clone/i });
    expect(cloneButton).toBeInTheDocument();

    // Simulate User Action: Fire a native click event
    fireEvent.click(cloneButton);

    // Assert: Verify the execution loop registers exactly 1 invocation parameter
    expect(mockOnCloneProfile).toHaveBeenCalledTimes(1);
  });

});
