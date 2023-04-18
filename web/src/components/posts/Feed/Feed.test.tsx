import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "../../../context/ToastContext";
import { Error } from "../../../types";
import Feed from "./Feed";

const user = {
  _id: "4c8a331bda76c559ef000004",
  fullName: "Monkey D. Luffy",
  userName: "luffy",
  email: "luffy@onepiece.com",
  password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
};

let mockLoading: boolean;
let mockPosts: { _id: string; author: string; content: string }[] | null;
let mockError: Error | null;

vi.mock("../../../hooks/useFetch", () => {
  return {
    default: vi.fn(() => ({
      data: mockPosts,
      loading: mockLoading,
      error: mockError,
    })),
  };
});

const post1 = {
  _id: "4c8a331bda76c559ef000009",
  author: user._id,
  content: "Test post 1",
  likes: [],
};

const posts = [
  post1,
  {
    _id: "4c8a331bda76c559ef000010",
    author: user._id,
    content: "Test post 2",
    likes: [],
  },
  {
    _id: "4c8a331bda76c559ef000011",
    author: user._id,
    content: "Test post 3",
    likes: [],
  },
  {
    _id: "4c8a331bda76c559ef000012",
    author: user._id,
    content: "Test post 4",
    likes: [],
  },
];

const updatePostLoading = false;
const updatePostError: any = null;

const post1Content = "Updated post 1";

const mockUpdatePost = vi
  .fn()
  .mockReturnValue({ ...post1, content: post1Content });

vi.mock("../../../hooks/useUpdatePost", () => {
  return {
    default: vi.fn(() => ({
      updatePost: mockUpdatePost,
      loading: updatePostLoading,
      error: updatePostError,
    })),
  };
});

describe("Feed component", () => {
  it("renders skeleton posts while loading", () => {
    mockLoading = true;
    mockPosts = null;
    mockError = null;

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    // Error UI not present
    const error = screen.queryByText(/unable to load feed/i);
    expect(error).not.toBeInTheDocument();

    const loaders = screen.getAllByTestId("skeleton-post");
    expect(loaders.length).toBe(6);
  });
  it("renders error message when there is an error", () => {
    mockLoading = false;
    mockPosts = null;
    mockError = { message: "Unable to load feed" };

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    const error = screen.getByText(/unable to load feed/i);
    expect(error).toBeInTheDocument();

    const loaders = screen.queryAllByTestId("skeleton-post");
    expect(loaders.length).toBe(0);
  });
  it("renders posts when loaded", () => {
    mockLoading = false;
    mockPosts = posts;
    mockError = null;

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    // Each post is an HTML accessible article component
    const postArticles = screen.getAllByRole("article");
    expect(postArticles.length).toBe(4);

    // Error UI not present
    const error = screen.queryByText(/unable to load feed/i);
    expect(error).not.toBeInTheDocument();

    // Loaders not present
    const loaders = screen.queryAllByTestId("skeleton-post");
    expect(loaders.length).toBe(0);
  });
  test("that deleting the post gets rid of the post in local state", async () => {
    mockLoading = false;
    mockPosts = [post1];
    mockError = null;

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    const openPostOptions = screen.getByRole("button", { expanded: false });
    await user.click(openPostOptions);

    const openDeleteModal = screen.getByRole("menuitem", {
      name: "Delete post",
    });

    await user.click(openDeleteModal);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const deletePostButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deletePostButton);

    const post = screen.queryByText("Test post 1");

    expect(post).not.toBeInTheDocument();
  });
  test("that editing the post updates the post in local state", async () => {
    mockLoading = false;
    mockPosts = [post1];
    mockError = null;

    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    const openPostOptions = screen.getByRole("button", { expanded: false });
    await user.click(openPostOptions);

    const openDeleteModal = screen.getByRole("menuitem", {
      name: "Edit post",
    });

    await user.click(openDeleteModal);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const postText = screen.getByRole("textbox");

    await user.type(postText, post1Content);

    const postButton = screen.getByRole("button", { name: "Post" });
    await user.click(postButton);

    const updatedPost = screen.getByText(post1Content);
    const post = screen.queryByRole("Test post 1");

    expect(updatedPost).toBeInTheDocument();
    expect(post).not.toBeInTheDocument();
  });
});
