import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../../context/AuthContext";
import DeletePostModal from "./DeletePostModal";

const deletePostMock = vi.fn();
let deletePostLoading = false;
let deletePostError: any = null;

vi.mock("../../../hooks/useDeletePost", () => {
  return {
    default: vi.fn(() => ({
      deletePost: deletePostMock,
      loading: deletePostLoading,
      error: deletePostError,
    })),
  };
});

describe("DeletePostModal component", () => {
  const bobJones = {
    _id: "4c8a331bda76c559ef000006",
    fullName: "Bob Jones",
    userName: "bobjones",
    email: "bobjones@gmail.com",
  };
  test("displays correct alert", () => {
    const toggleModalMock = vi.fn();
    const handleDeleteMock = vi.fn();
    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeletePostModal
          toggleModal={toggleModalMock}
          postId="1"
          handleDeletePost={handleDeleteMock}
        />
      </AuthContext.Provider>
    );
    const userAlert = screen.getByText(
      "Are you sure you want to delete your post, Bob Jones?"
    );
    expect(userAlert).toBeInTheDocument();
  });
  test("displays correct delete button text when loading is false", () => {
    deletePostLoading = false;
    const toggleModalMock = vi.fn();
    const handleDeleteMock = vi.fn();
    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeletePostModal
          toggleModal={toggleModalMock}
          postId="1"
          handleDeletePost={handleDeleteMock}
        />
      </AuthContext.Provider>
    );
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();
  });
  test("displays correct delete button text when loading is true", () => {
    deletePostLoading = true;
    const toggleModalMock = vi.fn();
    const handleDeleteMock = vi.fn();

    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeletePostModal
          toggleModal={toggleModalMock}
          postId="1"
          handleDeletePost={handleDeleteMock}
        />
      </AuthContext.Provider>
    );
    const deleteButton = screen.getByRole("button", { name: "Deleting..." });
    expect(deleteButton).toBeInTheDocument();
  });
  test("calls toggleModal when cancel button is clicked", async () => {
    const toggleModalMock = vi.fn();
    const handleDeleteMock = vi.fn();

    const user = userEvent.setup();

    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeletePostModal
          toggleModal={toggleModalMock}
          postId="1"
          handleDeletePost={handleDeleteMock}
        />
      </AuthContext.Provider>
    );
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);
    expect(toggleModalMock).toHaveBeenCalled();
  });

  test("calls handleDeletePost and deletePost when delete button is clicked", async () => {
    deletePostLoading = false;
    const toggleModalMock = vi.fn();
    const handleDeleteMock = vi.fn();

    const user = userEvent.setup();

    render(
      <AuthContext.Provider value={{ user: bobJones }}>
        <DeletePostModal
          toggleModal={toggleModalMock}
          postId="1"
          handleDeletePost={handleDeleteMock}
        />
      </AuthContext.Provider>
    );
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);
    expect(handleDeleteMock).toHaveBeenCalledWith("1");
    expect(deletePostMock).toHaveBeenCalledWith("1");
  });
});
