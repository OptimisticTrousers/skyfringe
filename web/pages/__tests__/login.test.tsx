import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer } from "react";
import Login from "../login.page";

describe("Login page", () => {
  describe("Form validation", () => {
    test("if the user enters an invalid input into the email field, then clicks away, an error message should appear", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const emailInput = screen.getByLabelText("Email Address");
      await user.type(emailInput, "locospollos");
      // Remove focus from the password input
      await user.tab();
      expect(emailInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The email field must be a valid email"
      );
      expect(errorMessage).toBeInTheDocument();
    });
    test("if the users enters an invalid input into the password field, then clicks away, an error message should appear", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "bobjone");
      // Remove focus from the password input
      await user.tab();
      expect(passwordInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).toBeInTheDocument();
    });
    test("if the users enters an invalid input into the email field, then clicks away, an error message should appear. Then, when the user enters the field correctly, the message goes away", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const emailInput = screen.getByLabelText("Email Address");
      await user.type(emailInput, "locospollos");
      // Remove focus from the password input
      await user.tab();
      expect(emailInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The email field must be a valid email"
      );
      expect(errorMessage).toBeInTheDocument();
      await user.clear(emailInput);
      await user.type(emailInput, "bobjones@gmail.com");
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters a correct email input, no error message should appear", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const emailInput = screen.getByLabelText("Email Address");
      await user.type(emailInput, "bobjones@gmail.com");
      const errorMessage = screen.queryByText(
        "Input is not a valid e-mail address."
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters a correct password input, no error message should appear", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "bobjones@gmail.com");
      const errorMessage = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the users enters an invalid input into the password field, then clicks away, then, when the user enters the field correctly, the message goes away", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "bobjone");
      // Remove focus from the password input
      await user.tab();
      expect(passwordInput).not.toHaveFocus();
      await user.type(passwordInput, "bobjones");
      const errorMessage = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
  // describe("Button text changes", () => {
  //   test("Renders 'Log in' text by default", () => {
  //     render(<Login />);
  //     const button = screen.getByRole("button", { name: "Log In" });
  //     expect(button).toBeInTheDocument();
  //   });
  //   test("Renders loading text appropriately", async () => {
  //     render(<Login />);
  //     const button = screen.getByRole("button", { name: "Logging in..." });
  //     expect(button).toBeInTheDocument();
  //   });
  //   test("Reverts to default button text on error", () => {
  //     render(<Login />);
  //     const button = screen.getByRole("button", { name: "Log In" });
  //     expect(button).toBeInTheDocument();
  //   });
  // });
});
