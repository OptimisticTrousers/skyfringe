import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Settings from "./Settings";

describe("Settings page", () => {
  const bobJones = {
    _id: "4c8a331bda76c559ef000006",
    fullName: "Bob Jones",
    userName: "bobjones",
    email: "bobjones@gmail.com",
    bio: "Hi, I'm your friendly neighborhood Bob Jones",
    friends: ["4c8a331bda76c559ef000007"],
  };
  test("Hides modal by default", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: bobJones }}>
          <Settings />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  test("Shows modal when clicking the 'Delete' account button", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: bobJones }}>
          <Settings />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Click the close account button to reveal the delete account modal
    const closeAccountButton = screen.getByRole("button", {
      name: "Delete",
    });
    await userEvent.click(closeAccountButton);

    const deleteAccountModal = screen.getByRole("dialog");
    expect(deleteAccountModal).toBeInTheDocument();
  });
  test("if it automatically populates the 'Full Name', 'Bio' and 'Email' fields", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: bobJones }}>
          <Settings />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const fullNameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const bioInput = screen.getByLabelText("Bio");
    expect(fullNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(bioInput).toBeInTheDocument();
  });
});
