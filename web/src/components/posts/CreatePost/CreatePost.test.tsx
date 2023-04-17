import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CreatePost from "./CreatePost";

describe("CreatePost component", () => {
  test("Hides modal by default", () => {
    render(<CreatePost />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  test("Shows modal when clicking create post button", async () => {
    const user = userEvent.setup();
    render(<CreatePost />);

    // Click the create post button to reveal the add post form
    const createPostButton = screen.getByRole("button");

    await user.click(createPostButton);

    const createPostModal = screen.getByRole("dialog");
    expect(createPostModal).toBeInTheDocument();
  });
});
