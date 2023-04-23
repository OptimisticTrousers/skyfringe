import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import Aside from "./Aside";

const logoutMock = vi.fn();

vi.mock("../../hooks/useLogout", () => {
  return {
    default: vi.fn(() => ({
      logout: logoutMock,
      loading: false,
      error: null,
    })),
  };
});

describe("Aside component", () => {
  const user = {
    photo: { imageUrl: "https://example.com/image.png" },
    fullName: "John Doe",
    friends: [{}, {}, {}],
  };
  test("renders the user profile information", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <Aside />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const userAvatar = screen.getByAltText("user avatar");
    const userName = screen.getByText(user.fullName);
    const userFriendCount = screen.getByText(`${user.friends.length} friends`);

    expect(screen.getByRole("complementary")).not.toHaveClass("aside--closed");
    expect(userAvatar.getAttribute("src")).toBe(user.photo.imageUrl);
    expect(userName).toBeInTheDocument();
    expect(userFriendCount).toBeInTheDocument();
  });

  it("should log the user out when the logout button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <Aside />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const logoutButton = screen.getByText("Log Out");
    await user.click(logoutButton);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
