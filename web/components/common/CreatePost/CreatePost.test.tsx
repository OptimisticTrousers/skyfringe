import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePost from "./CreatePost";

describe("CreatePost component", () => {
  test("Hides modal by default", () => {
    render(<CreatePost />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  test("Shows modal when clicking create post button", async () => {
    render(<CreatePost />);

    // Click the create post button to reveal the add post form
    const createPostButton = screen.getByRole("button");

    await userEvent.click(createPostButton);

    const createPostModal = screen.getByRole("dialog");
    expect(createPostModal).toBeInTheDocument();
  });
});
