import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "../../../context/ToastContext";
import Feed from "./Feed";

const user = {
  _id: "4c8a331bda76c559ef000004",
  fullName: "Monkey D. Luffy",
  userName: "luffy",
  email: "luffy@onepiece.com",
  password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
};

let mockLoading: any;
let mockPosts: any;
let mockError: any;

vi.mock("../../../hooks/useFetch", () => ({
  useFetch: () => ({
    data: mockPosts,
    loading: mockLoading,
    error: mockError,
  }),
}));

vi.mock("react", async () => {
  const actual: any = await vi.importActual("react");
  return {
    ...actual,
    useContext: vi.fn(() => ({
      user,
      ready: true,
    })),
  };
});

describe("Feed component", () => {
  const setup = (jsx: JSX.Element) => {
    return {
      ...render(jsx),
    };
  };
  it("renders skeleton posts while loading", () => {
    mockLoading = true;
    mockPosts = null;
    mockError = null;

    setup(
      <BrowserRouter>
        <ToastProvider>
          <Feed />
        </ToastProvider>
      </BrowserRouter>
    );

    // Error UI not present
    const error = screen.queryByText(/unable to load/i);
    expect(error).not.toBeInTheDocument();

    const loaders = screen.getAllByTestId("skeleton-post");
    expect(loaders.length).toBe(6);
  });
  it("renders error message when there is an error", () => {
    mockLoading = false;
    mockPosts = null;
    mockError = true;

    setup(
      <BrowserRouter>
        <ToastProvider>
          <Feed />
        </ToastProvider>
      </BrowserRouter>
    );

    const error = screen.getByText(/unable to load/i);
    expect(error).toBeInTheDocument();

    const loaders = screen.queryAllByTestId("skeleton-post");
    expect(loaders.length).toBe(0);
  });
  it("renders posts when loaded", () => {
    mockLoading = false;
    mockPosts = [
      {
        _id: "4c8a331bda76c559ef000009",
        author: user._id,
        content: "Test post 1",
        likes: [],
      },
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
    mockError = false;

    setup(
      <BrowserRouter>
        <ToastProvider>
          <Feed />
        </ToastProvider>
      </BrowserRouter>
    );

    // Each post is an HTML accessible article component
    const posts = screen.getAllByRole("article");
    expect(posts.length).toBe(4);

    // Error UI not present
    const error = screen.queryByText(/unable to load/i);
    expect(error).not.toBeInTheDocument();

    // Loaders not present
    const loaders = screen.queryAllByTestId("skeleton-post");
    expect(loaders.length).toBe(0);
  });
});
