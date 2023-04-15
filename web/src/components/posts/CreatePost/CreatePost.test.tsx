import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CreatePost from "./CreatePost";

describe("CreatePost component", () => {
  const setup = (jsx: JSX.Element) => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  };

  test("Hides modal by default", () => {
    setup(<CreatePost />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  test("Shows modal when clicking create post button", async () => {
    const { user } = setup(<CreatePost />);

    // Click the create post button to reveal the add post form
    const createPostButton = screen.getByRole("button");

    await user.click(createPostButton);

    const createPostModal = screen.getByRole("dialog");
    expect(createPostModal).toBeInTheDocument();
  });
});
