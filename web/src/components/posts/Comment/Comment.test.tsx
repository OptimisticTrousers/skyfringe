import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comment from "./Comment";

const editCommentMock = vi.fn();

vi.mock("../../hooks/useEditComment", () => {
  return {
    default: vi.fn(() => ({
      logout: editCommentMock,
      loading: false,
      error: null,
    })),
  };
});

const deleteCommentMock = vi.fn();

vi.mock("../../hooks/useDeleteComment", () => {
  return {
    default: vi.fn(() => ({
      logout: deleteCommentMock,
      loading: false,
      error: null,
    })),
  };
});

const likeCommentMock = vi.fn();

vi.mock("../../hooks/useLikeComment", () => {
  return {
    default: vi.fn(() => ({
      logout: likeCommentMock,
      loading: false,
      error: null,
    })),
  };
});

const user = {
  _id: zoroId,
  fullName: "Roronoa Zoro",
  userName: "zoro",
  email: "zoro@onepiece.com",
};
const post = {
  _id: "4c8a331bda76c559ef000010",
  author: user,
  content: "test post",
  likes: [],
};
const comment = {
  _id: "4c8a331bda76c559ef000014",
  post,
  author: user,
  content: "test comment",
  likes: [],
};

describe("Comment component", () => {
  test("that clicking the 'Like' button increments the like count", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);
    const likeCount = screen.getByText("1");
    expect(likeCommentMock).toHaveBeenCalled();
    expect(likeCount).toBeInTheDocument();
  });
  test("that when the 'likeComment' request is loading and the user has not already liked the comment, there is a 'Liking...' button that increments the like count", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);
    const likeCount = screen.getByText("1");
    expect(likeCommentMock).toHaveBeenCalled();
    expect(likeCount).toBeInTheDocument();
  });
  test("that when the 'likeComment' request is loading and the user has already liked the comment, there is a 'Unliking...' button decrements the like count", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);
    const likeCount = screen.getByText("1");
    expect(likeCommentMock).toHaveBeenCalled();
    expect(likeCount).toBeInTheDocument();
  });
  test("that clicking the 'Liked' button decrements the like count", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);
    const likeCount = screen.getByText("1");
    expect(likeCommentMock).toHaveBeenCalled();
    expect(likeCount).toBeInTheDocument();
  });
  test("that clicking the like count button opens the like count modal", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);
    const likeCountButton = screen.getByText("0");
    await user.click(likeCountButton);

    const likeCountModal = screen.getByRole("dialog");
    expect(likeCountModal).toBeInTheDocument();
  });
  test("that clicking the edit button works, that a new textbox appears, and that the save button works", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);
    const editInput = screen.getByRole("textbox");
    expect(editInput).toBeInTheDocument();

    await user.type(editInput, "test comment 2");
    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);
    const commentText = screen.getByText("test comment 2");

    expect(editCommentMock).toHaveBeenCalled();
    expect(commentText).toBeInTheDocument();
  });
  test("that clicking the delete button works and the comment disappears", async () => {
    const user = userEvent.setup();
    render(<Comment comment={comment} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    const postComment = screen.getByRole("article");
    expect(deleteCommentMock).toHaveBeenCalled();
    expect(postComment).not.toBeInTheDocument();
  });
});
