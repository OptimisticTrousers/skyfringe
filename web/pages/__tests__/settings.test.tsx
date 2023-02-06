import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Settings from "../settings.page";

describe("Settings page", () => {
  test("Hides modal by default", () => {
    render(<Settings />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  test("Shows modal when clicking create post button", async () => {
    render(<Settings />);

    // Click the close account button to reveal the delete account modal
    const closeAccountButton = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(closeAccountButton);

    const deleteAccountModal = screen.getByRole("dialog");
    expect(deleteAccountModal).toBeInTheDocument();
  });
});
