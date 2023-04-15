import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "../../../context/ToastContext";
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
    // Typing to make sure that the post button is disabled
    const postText = screen.getByRole("textbox");
    await user.type(postText, "test");
    await user.click(postButton);
    expect(toggleModal).toHaveBeenCalled();
  });
  test("if image upload button works correctly", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);
    const imageUploadButton = screen.getByLabelText("Add picture");
    const file = new File(["test image"], "images/optimistictrousers.jpg", {
      type: "image/jpg",
    });
    await user.upload(imageUploadButton, file);
    expect(screen.getByAltText("Preview image")).toBeInTheDocument();
  });
  test("that the image upload button displays an error message when the file is too big", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(
      <ToastProvider>
        <CreatePostModal toggleModal={toggleModal} />
      </ToastProvider>
    );
    const imageUploadButton = screen.getByLabelText("Add picture");
    const file = new File(["test image"], "images/massive.jpg", {
      type: "image/jpg",
    });
    await user.upload(imageUploadButton, file);
    expect(screen.getByAltText("Preview image")).toBeInTheDocument();
  });
  test("that the image is removed once the user clicks the 'X' button", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);
    const imageUploadButton = screen.getByLabelText("Add picture");
    const file = new File(["test image"], "images/massive.jpg", {
      type: "image/jpg",
    });
    await user.upload(imageUploadButton, file);
    const removeImageButton = screen.getByRole("button", {
      name: "Remove image",
    });
    await user.click(removeImageButton);
    expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
  });
});
