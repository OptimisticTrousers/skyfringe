import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePostModal from "./CreatePostModal";

describe("CreatePostModal component", () => {
  test("Disables post button by default", () => {
    const toggleModal = jest.fn();

    render(<CreatePostModal toggleModal={toggleModal} />);

    const postButton = screen.getByRole("button", { name: /post/i });
    expect(postButton).toHaveAttribute("disabled");
  });
  test("Enables post button once user enters post text", () => {
    const toggleModal = jest.fn();
    render(<CreatePostModal toggleModal={toggleModal} />);

    const postButton = screen.getByRole("button", { name: /post/i });
    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");

    expect(postButton).toHaveAttribute("disabled", "");
  });
});
