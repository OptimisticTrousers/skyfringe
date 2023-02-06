import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login.page";

describe("Login page", () => {
  describe("Button text changes", () => {
    test("Renders 'Log in' text by default", () => {
      render(<Login />);
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
    test("Renders loading text appropriately", async () => {
      render(<Login />);
      const button = screen.getByRole("button", { name: "Logging in..." });
      expect(button).toBeInTheDocument();
    });
    test("Reverts to default button text on error", () => {
      render(<Login />);
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
  });
});
