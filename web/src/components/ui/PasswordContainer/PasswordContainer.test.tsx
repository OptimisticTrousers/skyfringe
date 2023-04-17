import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordContainer from "./PasswordContainer";

describe("PasswordContainer component", () => {
  it("toggles the password visibility when the button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <PasswordContainer showPassword={false} handleClick={handleClick}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </PasswordContainer>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
