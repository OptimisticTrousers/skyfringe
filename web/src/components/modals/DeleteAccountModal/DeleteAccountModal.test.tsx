import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../../context/AuthContext";
import DeleteAccountModal from "./DeleteAccountModal";

const deleteAccountMock = vi.fn();
let deleteAccountLoading = false;
let deleteAccountError: any = null;

vi.mock("../../../hooks/useDeleteAccount", () => {
  return {
    default: vi.fn(() => ({
      deletePost: deleteAccountMock,
      loading: deleteAccountLoading,
      error: deleteAccountError,
    })),
  };
});

describe("DeleteAccountModal component", () => {
  const bobJones = {
    _id: "4c8a331bda76c559ef000006",
    fullName: "Bob Jones",
    userName: "bobjones",
    email: "bobjones@gmail.com",
  };
  test("displays correct alert", () => {
    const toggleModalMock = vi.fn();
    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeleteAccountModal
          toggleModal={toggleModalMock}
          userId={bobJones._id}
        />
      </AuthContext.Provider>
    );
    const userAlert = screen.getByText(
      "Are you sure you want to delete your account, Bob Jones?"
    );
    expect(userAlert).toBeInTheDocument();
  });
  test("displays correct delete button text when loading is false", () => {
    deleteAccountLoading = false;
    const toggleModalMock = vi.fn();
    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeleteAccountModal
          toggleModal={toggleModalMock}
          userId={bobJones._id}
        />
      </AuthContext.Provider>
    );
    const deleteButton = screen.getByRole("button", { name: "Delete Account" });
    expect(deleteButton).toBeInTheDocument();
  });
  test.skip("displays correct delete button text when loading is true", () => {
    deleteAccountLoading = true;
    const toggleModalMock = vi.fn();

    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeleteAccountModal
          toggleModal={toggleModalMock}
          userId={bobJones._id}
        />
      </AuthContext.Provider>
    );
    const deleteButton = screen.getByRole("button", {
      name: "Deleting Account...",
    });
    expect(deleteButton).toBeInTheDocument();
  });
  test.skip("calls deleteAccount when delete button is clicked", async () => {
    deleteAccountLoading = false;
    const toggleModalMock = vi.fn();

    const user = userEvent.setup();

    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeleteAccountModal
          toggleModal={toggleModalMock}
          userId={bobJones._id}
        />
      </AuthContext.Provider>
    );
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);
    expect(deleteAccountMock).toHaveBeenCalledWith("1");
  });
});
