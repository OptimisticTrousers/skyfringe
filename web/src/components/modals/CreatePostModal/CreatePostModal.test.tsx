import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePostModal from "./CreatePostModal";

describe("CreatePostModal component", () => {
  const setup = (jsx: JSX.Element) => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  };

  test("if modal title is 'Create Post'", () => {
    const toggleModal = vi.fn();
    setup(<CreatePostModal toggleModal={toggleModal} />);
    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });

  test("Disables post button by default", () => {
    const toggleModal = vi.fn();
    setup(<CreatePostModal toggleModal={toggleModal} />);

    const postButton = screen.getByRole("button", { name: /post/i });
    expect(postButton).toHaveAttribute("disabled");
  });

  test("Enables post button once user enters post text", () => {
    const toggleModal = vi.fn();
    setup(<CreatePostModal toggleModal={toggleModal} />);

    const postButton = screen.getByRole("button", { name: /post/i });
    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");

    expect(postButton).toHaveAttribute("disabled", "");
  });
  test("if modal is closed when 'Post' button is clicked", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);
    const postButton = screen.getByRole("button", { name: /post/i });
    await user.click(postButton);
    expect(toggleModal).toHaveBeenCalled();
  });
  test("if image upload button works correctly", async () => {
    const toggleModal = vi.fn();
    const {user} = setup(<CreatePostModal toggleModal={toggleModal} />);
    const imageUploadButton = screen.getByLabelText("Add image");
    const file = new File(["test image"], "images/optimistictrousers.png", {
      type: "image/png",
    });
    user.upload(imageUploadButton, file)
    expect(screen.getByAltText("Preview image")).toBeInTheDocument()
  });
});
