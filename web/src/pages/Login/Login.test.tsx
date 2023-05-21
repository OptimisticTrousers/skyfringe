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
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { ToastProvider } from "../../context/ToastContext";
import Login from "./Login";

// Customize loading/error/data states to properly test UI in different states
const loginMock = vi.fn();
let mockLoading: any = false;
let mockError: any = null;
let mockFormError: any[] = [null];

vi.mock("../../hooks/useLogin", () => {
  return {
    default: vi.fn(() => ({
      login: loginMock,
      loading: mockLoading,
      error: mockError,
      formError: mockFormError,
    })),
  };
});

describe("Login page", () => {
  describe("Server validation", () => {
    it("shows single form validation error when only one is provided", () => {
      mockLoading = false;
      mockError = false;
      mockFormError = [
        {
          value: "",
          msg: "Email is required",
          param: "email",
          location: "body",
        },
      ];

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const error = screen.getByText("Email is required");
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
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const errorOne = screen.getByText("Email is required");
      const errorTwo = screen.getByText("Password is required");
      expect(errorOne).toBeInTheDocument();
      expect(errorTwo).toBeInTheDocument();
    });
  });
  describe("Form validation", () => {
    test("disables all inputs when loading is true", () => {
      mockLoading = true;
      mockError = null;
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const emailInput = screen.getByLabelText("Email Address");
      const passwordInput = screen.getByLabelText("Password");
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
    });
    test("handles form submission correctly", async () => {
      mockLoading = false;
      mockError = null;
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const emailInput = screen.getByLabelText("Email Address");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Log In" });

      await user.type(emailInput, "valid-email@example.com");
      await user.type(passwordInput, "valid-password");
      await user.click(submitButton);
      expect(loginMock).toHaveBeenCalledWith({
        email: "valid-email@example.com",
        password: "valid-password",
      });
    });
    test("No error should be present at first", () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      // In this case, all of the fields are empty
      const emailError = screen.queryByText(
        "The email field must be a valid email"
      );
      const passwordError = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      const emailFormError = screen.queryByText(
        "The email field must be a valid email"
      );
      const passwordFormError = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      expect(emailError).not.toBeInTheDocument();
      expect(emailFormError).not.toBeInTheDocument();
      expect(passwordError).not.toBeInTheDocument();
      expect(passwordFormError).not.toBeInTheDocument();
    });
    test("if the user enters an invalid input into the email field, then tabs away, an error message should appear", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const emailInput = screen.getByLabelText("Email Address");
      // Focus on email input
      emailInput.focus();
      expect(emailInput).toHaveFocus();
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
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const passwordInput = screen.getByLabelText("Password");
      // Focus on password input
      passwordInput.focus();
      expect(passwordInput).toHaveFocus();
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
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const emailInput = screen.getByLabelText("Email Address");
      // Focus on email input
      emailInput.focus();
      // Remove focus from the password input
      expect(emailInput).toHaveFocus();
      await user.tab();
      expect(emailInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The email field must be a valid email"
      );
      expect(errorMessage).toBeInTheDocument();
      await user.type(emailInput, "bobjones@gmail.com");
      await user.tab();
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters a correct email input, no error message should appear", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
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
        <BrowserRouter>
          <Login />
        </BrowserRouter>
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
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const passwordInput = screen.getByLabelText("Password");
      // Focus on password input
      passwordInput.focus();
      expect(passwordInput).toHaveFocus();
      // Remove focus from the password input
      await user.tab();
      expect(passwordInput).not.toHaveFocus();
      const errorMessage = screen.getByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).toBeInTheDocument();
      await user.type(passwordInput, "bobjones");
      await user.tab();
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
  describe("Button text changes", () => {
    mockLoading = false;
    mockError = false;
    test("Renders 'Log in' text by default", () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
    test("Renders loading text appropriately", async () => {
      mockLoading = true;
      mockError = false;
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: "Logging in..." });
      expect(button).toBeInTheDocument();
    });
    test("Reverts to default button text on error", () => {
      mockLoading = false;
      mockError = true;
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const button = screen.getByRole("button", { name: "Log In" });
      expect(button).toBeInTheDocument();
    });
  });
});
