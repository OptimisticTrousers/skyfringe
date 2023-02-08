import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login.page";

describe("Login page", () => {
  describe("Form validation", () => {
    it("displays error message when the user clicks on the email input field, then clicks away", () => {
      render(<Login />);
      const emailInput = screen.getByRole("textbox", {
        name: "Email Address (required) ",
      });
      userEvent.click(emailInput);
      // Click away from the email input field to remove the focus on the email input field
      userEvent.click(document.body);
      //https://stackoverflow.com/questions/56978283/unit-testing-react-click-outside-component-using-jest-and-react-testing-library
      const errorMessage = screen.getByText("Input is required.");
      expect(errorMessage).toBeInTheDocument();
    });
    it("displays error message on input fields when all of the fields are empty and the user tries to log in", () => {
      render(<Login />);
      const loginButton = screen.getByRole("button", { name: "Log In" });
      userEvent.click(loginButton);
      const errorMessages = screen.getAllByText("Input is required.");
      // Expect the number of error messages to be two since there are two input fields on the login page
      expect(errorMessages.length).toBe(2);
    });
    test("if the user enters an invalid input into the email field, then clicks away, an error message should appear", () => {
      render(<Login />);
      const emailInput = screen.getByRole("textbox", {
        name: "Email Address (required)",
      });
      userEvent.type(emailInput, "bob jones");
      // Remove focus from the email input
      userEvent.click(document.body);
      const errorMessage = screen.getByText(
        "Input is not a valid e-mail address."
      );
      expect(errorMessage).toBeInTheDocument();
    });
    test("if the users enters an invalid input into the password field, then clicks away, an error message should appear", () => {
      render(<Login />);
      const passwordInput = screen.getByLabelText("Password (required)");
      userEvent.type(passwordInput, "bobjone");
      // Remove focus from the password input
      userEvent.click(document.body);
      const errorMessage = screen.getByText(
        "Input must be at least 8 characters long."
      );
      expect(errorMessage).toBeInTheDocument();
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
