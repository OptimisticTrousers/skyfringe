import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../../context/AuthContext";
import Post from "./Post";

describe("Post component", () => {
  const wrongUser = {
    _id: "4c8a331bda76c559ef000008",
  };
  const correctUser = {
    _id: "456",
    fullName: "John Doe",
    password: "johndoe",
    email: "johndoe@gmail.com",
    userName: "johndoe",
    createdAt: new Date(),
    updatedAt: new Date(),
    friends: [],
    friendRequests: [],
    photo: {
      imageUrl: "https://example.com/johndoe.jpg",
      altText: "test user",
    },
  };
  const mockPost = {
    _id: "4c8a331bda76c559ef000009",
    author: correctUser,
    likes: ["4c8a331bda76c559ef000009"],
    content: "This is a test post.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photo: {
      imageUrl: "https://example.com/test.jpg",
      altText: "test post",
    },
  };
  describe("Text-only posts", () => {
    test("Does not attempt to display image when no image url exists for the post", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={{ ...mockPost, photo: undefined }} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      // Image posts will have blank alt text
      const photo = screen.queryByAltText("test post");
      expect(photo).not.toBeInTheDocument();
    });
  });
  describe("Image-containing posts", () => {
    test("Displays post image when url exists for the post", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      // Image posts will have blank alt text
      const photo = screen.getByAltText("test post");
      expect(photo).toBeInTheDocument();
    });
  });
  describe("All posts", () => {
    test("if clicking on the like count button opens the modal for likes", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );

      const likeCountButton = screen.getByRole("button", { name: "2 likes" });
      await user.click(likeCountButton);

      const likesModal = screen.queryByRole("dialog");
      expect(likesModal).toBeInTheDocument();
    });
    test("Does not display post menu btn on other people's post", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: wrongUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const button = screen.queryByRole("menu");
      expect(button).not.toBeInTheDocument();
    });
    test("Display correct comment count for three comments", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const commentsButton = screen.getByRole("button", { name: "3 comments" });
      expect(commentsButton).toBeInTheDocument();
    });
    test("Displays correct like count for 2 likes", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const likeButton = screen.getByRole("button", { name: "2 likes" });
      expect(likeButton).toBeInTheDocument();
    });
    test("Hides comments section by default", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const comments = screen.queryByTestId(/comments/i);
      expect(comments).toHaveStyle({ maxHeight: "0px" });
      expect(comments).not.toBeVisible();
    });
    test("Shows comments section upon clicking comments button", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );

      const commentsButton = screen.getByRole("button", { name: "3 comments" });
      await user.click(commentsButton);

      const comments = await screen.findByTestId("comments");
      expect(comments).toHaveStyle({ maxHeight: "100vh" });
      expect(comments).toBeVisible();
    });
    test("Increases local like count when clicking like button", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: correctUser }}>
            <Post post={mockPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const likeButton = screen.getByRole("button", { name: "1 like" });
      await user.click(likeButton);

      expect(likeButton).toHaveAccessibleName("2 likes");
    });
  });
});
