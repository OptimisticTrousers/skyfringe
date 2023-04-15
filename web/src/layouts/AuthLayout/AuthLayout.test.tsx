import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthLayout from "./AuthLayout";

describe("AuthLayout", () => {
  it("renders the title and form", () => {
    const title = "Sign Up";
    const handleSubmit = vi.fn();
    render(
      <AuthLayout handleSubmit={handleSubmit} title={title}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </AuthLayout>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("calls the handleSubmit function when the form is submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(
      <AuthLayout handleSubmit={handleSubmit} title="Sign Up">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </AuthLayout>
    );
    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
