import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login.page";

describe("Login page", () => {
  describe("Button text changes", () => {
    test("Renders 'Log in' text by default", () => {
      render(<Login />);

      const button = screen.getByRole("button", { name: "Log in" });
      expect(button).toBeInTheDocument();
    });
    test("Renders loading text appropriately", async () => {
      const button = screen.getByRole("button", { name: /logging in/i });
      expect(button).toBeInTheDocument();
    });
    test("Reverts to default button text on error", () => {
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
  });
});
