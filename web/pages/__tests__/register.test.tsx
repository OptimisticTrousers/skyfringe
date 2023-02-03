import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../register.page";

describe("Register page", () => {
  describe("Password confirmation input", () => {
    test("hides confirmPassword input by default", () => {
      render(<Register />);
      const input = screen.queryAllByLabelText("Confirm password");
      expect(input.length).toBe(0);
    });
    test("shows confirmPassword input when user begins typing in password input", () => {
      render(<Register />);

      const password = screen.getByLabelText("Password");

      userEvent.type(password, "test");

      // Now that user has typed in password field, confirmPassword field should appear
      const confirm = screen.getByLabelText("Confirm password");
      expect(confirm).toBeInTheDocument();
    });
  });
  describe("Button text changes", () => {
    test("Renders 'Create Account' text by default", () => {
      render(<Register />);
      const button = screen.getByRole("button", { name: "Create Account" });
      expect(button).toBeInTheDocument();
    });
    test("Renders loading text appropriately", () => {
      render(<Register />);

      const button = screen.getByRole("button", { name: /creating/i });
      expect(button).toBeInTheDocument();
    });
    test("Reverts to default button text on error", () => {
      render(<Register />);
      const button = screen.getByRole("button", { name: "Create Account" });
      expect(button).toBeInTheDocument();
    });
  });
});
