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
import { AuthProvider } from "../../context/AuthContext";
import { ToastProvider } from "../../context/ToastContext";
import { FormError } from "../../types";
import Login from "../login.page";

let mockLoading: boolean;
let mockError: boolean;
let mockFormError: FormError[];

jest.mock("../../hooks/useLogin", () => ({
  __esModule: true,
  default: () => ({
    register: jest.fn,
    loading: mockLoading,
    error: mockError,
    formError: mockFormError,
  }),
}));

describe("Login page", () => {
  describe("Server validation", () => {
    it("shows single form validation error when only one is provided", () => {
      mockLoading = false;
      mockError = true;
      mockFormError = [
        {
          value: "",
          msg: "Email is required",
          param: "email",
          location: "body",
        },
      ];

      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );

      const error = screen.getByText(/email is required/i);
      expect(error).toBeInTheDocument();
    });
    it("shows multiple form validation errors when multiple are set", () => {
      mockLoading = false;
      mockError = true;
      mockFormError = [
        {
          value: "",
          msg: "Email is required",
          param: "email",
          location: "body",
        },
        {
          value: "",
          msg: "Password is required",
          param: "password",
          location: "body",
        },
      ];

      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );

      const errorOne = screen.getByText(/email is required/i);
      const errorTwo = screen.getByText(/password is required/i);
      expect(errorOne).toBeInTheDocument();
      expect(errorTwo).toBeInTheDocument();
    });
  });
  describe("Form validation", () => {
    test("if the user enters an invalid input into the email field, then clicks away, an error message should appear", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
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
    // test("if the users enters an invalid input into the password field, then clicks away, an error message should appear", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <AuthProvider>
    //       <ToastProvider>
    //         <Login />
    //       </ToastProvider>
    //     </AuthProvider>
    //   );
    //   const passwordInput = screen.getByLabelText("Password");
    //   await user.type(passwordInput, "bobjone");
    //   // Remove focus from the password input
    //   await user.tab();
    //   expect(passwordInput).not.toHaveFocus();
    //   const errorMessage = screen.getByText(
    //     "The password field must be at least 8 characters"
    //   );
    //   expect(errorMessage).toBeInTheDocument();
    // });
    test("if the users enters an invalid input into the email field, then clicks away, an error message should appear. Then, when the user enters the field correctly, the message goes away", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
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
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
      const emailInput = screen.getByLabelText("Email Address");
      await user.type(emailInput, "bobjones@gmail.com");
      const errorMessage = screen.queryByText(
        "Input is not a valid e-mail address."
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters a correct password input, no error message should appear", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "bobjones@gmail.com");
      const errorMessage = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the users enters an invalid input into the password field, then clicks away, then, when the user enters the field correctly, the message goes away", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
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
  describe("Button text changes", () => {
    mockLoading = false;
    mockError = false;
    test("Renders 'Log in' text by default", () => {
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
    test("Renders loading text appropriately", async () => {
      mockLoading = true;
      mockError = false;
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
      const button = screen.getByRole("button", { name: "Logging in..." });
      expect(button).toBeInTheDocument();
    });
    test("Reverts to default button text on error", () => {
      mockLoading = false;
      mockError = true;
      render(
        <AuthProvider>
          <ToastProvider>
            <Login />
          </ToastProvider>
        </AuthProvider>
      );
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
  });
});