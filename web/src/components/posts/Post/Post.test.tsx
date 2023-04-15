import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Post from "./Post";

describe("Post component", () => {
  const post = {
    _id: "4c8a331bda76c559ef000009",
    author: {
      _id: "4c8a331bda76c559ef000004",
      email: "luffy@onepiece.com",
      fullName: "Monkey D. Luffy",
      userName: "luffy",
      password: "bob",
      friends: [],
      friendRequests: [],
      createdAt: new Date(),
      friendCount: 0,
      updatedAt: new Date(),
    },
    content: "Test post 1",
    likes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const setup = () => render(<Post post={post} />);
  describe("Text-only posts", () => {
    test("Does not attempt to display image when no image url exists for the post", () => {
      setup();
      // Image posts will have blank alt text
      const pic = screen.queryAllByAltText("");
      expect(pic).not.toBeInTheDocument();
    });
    test("Display correct comment count for three comments", () => {
      setup();
      const commentsButton = screen.getByRole("button", { name: "Comment 3" });
      expect(commentsButton).toBeInTheDocument();
    });
    test("Displays correct like count for >1 like", () => {
      setup();
      const likeButton = screen.getByRole("button", { name: "Like 2" });
      expect(likeButton).toBeInTheDocument();
    });
    test("Hides comments section by default", () => {
      setup();
      const comments = screen.queryByTestId(/comments/i);
      expect(comments).not.toBeInTheDocument();
    });
    test("Shows comments section upon clicking comments button", async () => {
      setup();

      const commentsButton = screen.getByRole("button", { name: "Comment 45" });
      await userEvent.click(commentsButton);

      const comments = screen.getByTestId("comments");
      expect(comments).toBeInTheDocument();
    });
  });
  describe("Image-containing posts", () => {
    test("Does not display post menu btn on other people's post", () => {
      setup();
      const button = screen.queryByTestId(/menu/i);
      expect(button).not.toBeInTheDocument();
    });
    test("Displays post image when url exists for the post", () => {
      setup();
      // Image posts will have blank alt text
      const pic = screen.queryByAltText("");
      expect(pic).toBeInTheDocument();
    });
    test("Displays correct like count for single like", () => {
      setup();
      const likesButton = screen.getByRole("button", { name: "Like 1" });
      expect(likesButton).toBeInTheDocument();
    });
    test("Increases local like count when clicking like button", () => {
      setup();
      const likeButton = screen.getByRole("button", { name: "Like 1" });
      userEvent.click(likeButton);

      expect(likeButton).toHaveAccessibleName("Like 2");
    });
  });
});
