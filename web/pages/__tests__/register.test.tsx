import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../register.page";

describe("Register page", () => {
  describe("Form validation", () => {
    test("if the user enters an invalid input into the email field, then clicks away, an error message should appear", async () => {
      const user = userEvent.setup();
      render(<Register />);
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
    //   render(<Register />);
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
      render(<Register />);
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
    // test("if the users enters an invalid input into the password field, then clicks away, an error message should appear. Then, when the user enters the field correctly, the message goes away", async () => {
    //   const user = userEvent.setup();
    //   render(<Register />);
    //   const passwordInput = screen.getByLabelText("Password");
    //   await user.type(passwordInput, "bobjone");
    //   // Remove focus from the password input
    //   // fireEvent.focusOut(passwordInput);
    //   await user.tab();
    //   expect(passwordInput).not.toHaveFocus();
    //   const errorMessage = screen.getByText(
    //     "The password field must be at least 8 characters"
    //   );
    //   expect(errorMessage).toBeInTheDocument();
    //   await user.clear(passwordInput);
    //   await user.type(passwordInput, "bobjones");
    //   expect(errorMessage).not.toBeInTheDocument();
    // });
    test("if the user enters a correct email input, no error message should appear", async () => {
      const user = userEvent.setup();
      render(<Register />);
      const emailInput = screen.getByLabelText("Email Address");
      await user.type(emailInput, "bobjones@gmail.com");
      const errorMessage = screen.queryByText(
        "Input is not a valid e-mail address."
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters a correct password input, no error message should appear", async () => {
      const user = userEvent.setup();
      render(<Register />);
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "bobjones@gmail.com");
      const errorMessage = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters a correct password and a correct confirm password, then no error should message should appear", async () => {
      const user = userEvent.setup();
      render(<Register />);
      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "locospollos");
      const passwordConfInput = screen.getByLabelText("Confirm Password");
      await user.type(passwordConfInput, "locospollos");
      const passwordErrorMessage = screen.queryByText(
        "The password field must be at least 8 characters"
      );
      const passwordConfErrorMessage = screen.queryByText(
        "Passwords do not match"
      );
      expect(passwordErrorMessage).not.toBeInTheDocument();
      expect(passwordConfErrorMessage).not.toBeInTheDocument();
    });
    // test("if the user enters a password, but the confirm password field does not match, render an error message below the confirm password field", async () => {
    //   const user = userEvent.setup();
    //   render(<Register />);
    //   const passwordInput = screen.getByLabelText("Password");
    //   await user.type(passwordInput, "locospollos");
    //   const passwordConfInput = screen.getByLabelText("Confirm Password");
    //   await user.type(passwordConfInput, "locospollo");
    //   // Focus out of the password confirmation input so that the onBlur event can occur
    //   await user.tab();
    //   const passwordConfErrorMessage = screen.getByText(
    //     "Passwords do not match"
    //   );
    //   expect(passwordConfErrorMessage).toBeInTheDocument();
    // });
    // test("if the user enters a matching password and confirm password field, but the password input is less than 8 characters, render an error message below the password confirm field", async () => {
    //   const user = userEvent.setup();
    //   render(<Register />);
    //   const passwordInput = screen.getByLabelText("Password");
    //   await user.type(passwordInput, "pollos");
    //   fireEvent.focusOut(passwordInput);
    //   const passwordConfInput = screen.getByLabelText("Confirm Password");
    //   await user.type(passwordConfInput, "pollos");
    //   fireEvent.focusOut(passwordConfInput);
    //   const passwordErrorMessage = screen.getByText(
    //     "The password field must be at least 8 characters"
    //   );
    //   expect(passwordErrorMessage).toBeInTheDocument();
    // });
    // test("if the user enters text into the confirm password, but does not enter text in the password field, render an error message below the password field", async () => {
    //   const user = userEvent.setup();
    //   render(<Register />);
    //   const passwordConfInput = screen.getByLabelText("Confirm Password");
    //   await user.type(passwordConfInput, "pollos");
    //   await user.tab();
    //   // fireEvent.focusOut(passwordConfInput);
    //   // passwordConfInput.blur();
    //   expect(passwordConfInput).not.toHaveFocus();
    //   const passwordErrorMessage = screen.getByText(
    //     "The password field must be at least 8 characters"
    //   );
    //   expect(passwordErrorMessage).toBeInTheDocument();
    // });
    test("if the user enters a correct userName, then no error message should appear", async () => {
      const user = userEvent.setup();
      render(<Register />);
      const userNameInput = screen.getByLabelText("userName");
      await user.type(userNameInput, "bobjones");
      // Focus out of input element
      await user.tab();
      const errorMessage = screen.queryByText(
        "No spaces, uppercase letters, or special characters"
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
    test("if the user enters an incorrect userName, then focuses out of the element, an error message should appear below the input", async () => {
      const user = userEvent.setup();
      render(<Register />);
      const userNameInput = screen.getByLabelText("userName");
      await user.type(userNameInput, "AdsaA2@ad asdasd");
      // Focus out of input element
      await user.tab();
      const errorMessage = screen.getByText(
        "No spaces, uppercase letters, or special characters"
      );
      expect(errorMessage).toBeInTheDocument();
    });
    test("if the user enters an incorrect userName, then focuses out of the element, then corrects the userName field, show no error message", async () => {
      const user = userEvent.setup();
      render(<Register />);
      const userNameInput = screen.getByLabelText("userName");
      await user.type(userNameInput, "AdsaA2@ad asdasd");
      // Focus out of input element
      await user.tab();
      const errorMessage = screen.getByText(
        "No spaces, uppercase letters, or special characters"
      );
      expect(errorMessage).toBeInTheDocument();
      await user.clear(userNameInput);
      await user.type(userNameInput, "bobjones");
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
  describe("Password confirmation input", () => {
    // test("hides confirmPassword input by default", () => {
    //   render(<Register />);
    //   const input = screen.queryAllByLabelText("Confirm password");
    //   expect(input.length).toBe(0);
    // });
    // test("shows confirmPassword input when user begins typing in password input", () => {
    //   render(<Register />);
    //   const password = screen.getByLabelText("Password");
    //   userEvent.type(password, "test");
    //   // Now that user has typed in password field, confirmPassword field should appear
    //   const confirm = screen.getByLabelText("Confirm password");
    //   expect(confirm).toBeInTheDocument();
    // });
  });
  // describe("Button text changes", () => {
  //   test("Renders 'Create Account' text by default", () => {
  //     render(<Register />);
  //     const button = screen.getByRole("button", { name: "Create Account" });
  //     expect(button).toBeInTheDocument();
  //   });
  //   test("Renders loading text appropriately", () => {
  //     render(<Register />);

  //     const button = screen.getByRole("button", { name: /creating/i });
  //     expect(button).toBeInTheDocument();
  //   });
  //   test("Reverts to default button text on error", () => {
  //     render(<Register />);
  //     const button = screen.getByRole("button", { name: "Create Account" });
  //     expect(button).toBeInTheDocument();
  //   });
  // });
});
