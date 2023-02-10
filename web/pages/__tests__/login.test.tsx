import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer } from "react";
import Login from "../login.page";

describe("Login page", () => {
  describe("Form validation", () => {
    test("if the user enters an invalid input into the email field, then clicks away, an error message should appear", () => {
      const user = userEvent.setup();
      render(<Login />);
      const emailInput = screen.getByLabelText("Email Address");
      user.type(emailInput, "locospollos");
      // Remove focus from the password input
      fireEvent.focusOut(emailInput);
      expect(emailInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The email field must be a valid email"
      );
      expect(errorMessage).toBeInTheDocument();
    });
    test("if the users enters an invalid input into the password field, then clicks away, an error message should appear", () => {
      const user = userEvent.setup();
      render(<Login />);
      const passwordInput = screen.getByLabelText("Password");
      user.type(passwordInput, "bobjone");
      // Remove focus from the password input
      fireEvent.focusOut(passwordInput);
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
      user.type(emailInput, "locospollos");
      // Remove focus from the password input
      fireEvent.focusOut(emailInput);
      expect(emailInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The email field must be a valid email"
      );
      expect(errorMessage).toBeInTheDocument();
      user.clear(emailInput);
      user.type(emailInput, "bobjones@gmail.com");
      await waitFor(() => {
        expect(errorMessage).not.toBeInTheDocument();
      });
    });
    test("if the users enters an invalid input into the password field, then clicks away, an error message should appear. Then, when the user enters the field correctly, the message goes away", async () => {
      const user = userEvent.setup();
      render(<Login />);
      const passwordInput = screen.getByLabelText("Password");
      user.type(passwordInput, "bobjone");
      // Remove focus from the password input
      fireEvent.focusOut(passwordInput);
      expect(passwordInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).toBeInTheDocument();
      user.clear(passwordInput);
      user.type(passwordInput, "bobjones");
      await waitFor(() => {
        expect(errorMessage).not.toBeInTheDocument();
      });
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
