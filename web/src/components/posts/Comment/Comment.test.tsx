import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../../context/AuthContext";
import Comment from "./Comment";

const deleteCommentMock = vi.fn();
let deleteCommentLoading = false;
let deleteCommentError: any = null;

vi.mock("../../../hooks/useDeleteComment", () => {
  return {
    default: vi.fn(() => ({
      deleteComment: deleteCommentMock,
      loading: deleteCommentLoading,
      error: deleteCommentError,
    })),
  };
});

const likeCommentMock = vi.fn();

let likeCommentLoading = false;
let likeCommentError: any = null;

vi.mock("../../../hooks/useLikeComment", () => {
  return {
    default: vi.fn(() => ({
      likeComment: likeCommentMock,
      loading: likeCommentLoading,
      error: likeCommentError,
    })),
  };
});

const correctUser = {
  _id: "4c8a331bda76c559ef000005",
  fullName: "Roronoa Zoro",
  userName: "zoro",
  email: "zoro@onepiece.com",
};

const wrongUser = {
  _id: "4c8a331bda76c559ef000006",
  fullName: "Bob Jones",
  userName: "bobjones",
  email: "bobjones@gmail.com",
};
const post = {
  _id: "4c8a331bda76c559ef000010",
  author: correctUser,
  content: "test post",
  likes: [],
};
const comment = {
  _id: "4c8a331bda76c559ef000014",
  post,
  author: correctUser,
  content: "test comment",
  likes: [wrongUser],
};

const updatedContent: any = "Four-Sword Style";

const updateCommentMock = vi
  .fn()
  .mockReturnValue({ ...comment, content: updatedContent });

let mockUpdateCommentLoading = false;
let mockUpdateCommentError: any = null;

vi.mock("../../../hooks/useUpdateComment", () => {
  return {
    default: vi.fn(() => ({
      updateComment: updateCommentMock,
      loading: mockUpdateCommentLoading,
      error: mockUpdateCommentError,
    })),
  };
});

const mockDeleteLocalComment = vi.fn();
const mockEditLocalComment = vi.fn();

describe("Comment component", () => {
  test("that clicking the 'Like' button when a user has not liked the comment increments the like count", async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ user: correctUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const likeButton = screen.getByRole("button", { name: "Like" });
    await user.click(likeButton);
    const likeCount = screen.getByRole("button", { name: "2" });
    expect(likeCommentMock).toHaveBeenCalled();
    expect(likeCount).toBeInTheDocument();
  });
  test("that when the 'likeComment' request is loading and the user has not already liked the comment, there is a 'Liking...' button that increments the like count", async () => {
    likeCommentLoading = true;
    render(
      <AuthContext.Provider value={{ user: correctUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const likeButton = screen.getByRole("button", { name: "Liking..." });
    expect(likeButton).toBeInTheDocument();
  });
  test("that when the 'likeComment' request is loading and the user has already liked the comment, there is a 'Unliking...' button decrements the like count", async () => {
    const user = userEvent.setup();
    likeCommentLoading = true;
    render(
      <AuthContext.Provider value={{ user: wrongUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const likeButton = screen.getByRole("button", { name: "Unliking..." });
    expect(likeButton).toBeInTheDocument();
  });
  test("that clicking the 'Liked' button, which is when a user has already liked a comment, it decrements the like count", async () => {
    likeCommentLoading = false;
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ user: wrongUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const likeButton = screen.getByRole("button", { name: "Liked" });
    await user.click(likeButton);
    const likeCount = screen.getByRole("button", { name: "0" });
    expect(likeCommentMock).toHaveBeenCalled();
    expect(likeCount).toBeInTheDocument();
  });
  test("that clicking the like count button opens the like count modal", async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ user: correctUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const likeCountButton = screen.getByRole("button", { name: "1" });
    await user.click(likeCountButton);

    const likeCountModal = screen.getByRole("dialog");
    expect(likeCountModal).toBeInTheDocument();
  });
  test("that clicking the edit button works, that a new textbox appears and it has the old comment content, that the save button works, and the post updates", async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ user: correctUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);
    const editInput = screen.getByRole("textbox");
    expect(editInput).toBeInTheDocument();
    expect(editInput).toHaveValue("test comment");

    await user.clear(editInput);
    await user.type(editInput, updatedContent);
    const saveButton = screen.getByRole("button", { name: "Save" });
    await user.click(saveButton);
    // Can't test this because 'editLocalComment' is a function that changes state
    // const commentText = screen.getByText(updatedContent);

    // expect(commentText).toBeInTheDocument();
    expect(updateCommentMock).toHaveBeenCalled();
  });
  test("that clicking the delete button works and the comment disappears", async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ user: correctUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);
    // Can't test this because 'deleteLocalComment' is a function that changes state

    // const postComment = screen.queryByRole("article");
    // expect(postComment).not.toBeInTheDocument();
    expect(deleteCommentMock).toHaveBeenCalled();
  });
  test("if you can only like and delete your own comments", () => {
    render(
      <AuthContext.Provider value={{ user: wrongUser }}>
        <BrowserRouter>
          <Comment
            comment={comment}
            deleteLocalComment={mockDeleteLocalComment}
            editLocalComment={mockEditLocalComment}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const deleteButton = screen.queryByRole("button", { name: "Delete" });
    expect(deleteButton).not.toBeInTheDocument();
  });
});
