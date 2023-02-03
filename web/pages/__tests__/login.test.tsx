import {
  getByLabelText,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../login.page";

describe("Login page", () => {
  test("renders correct heading", () => {
    const { getByRole } = render(<Login />);
    const logo = screen.getByText(/Skyfringe/i);
    expect(logo.textContent).toMatch(/Skyfringe/i);
  });
  test("password visiblity", async () => {
    const { getByRole, getByPlaceholderText } = render(<Login />);
    const visibleButton = getByRole("button", { name: /Hide password./i });

    const user = userEvent.setup();

    await user.click(visibleButton);

    expect(getByPlaceholderText("1234")).toHaveAttribute("type", "text");
  });
});
