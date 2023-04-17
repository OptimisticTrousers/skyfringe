import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "../../../context/ToastContext";
import EditPostModal from "./EditPostModal";

describe("EditPostModal component", () => {
  const post = {
    _id: "4c8a331bda76c559ef000012",
    author: "4c8a331bda76c559ef000004",
    content: "Test post",
    likes: [],
  };

  const setup = (jsx: JSX.Element) => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  };

  test("if modal title is 'Edit Post'", () => {
    const toggleModal = vi.fn();
    setup(<EditPostModal toggleModal={toggleModal} post={post} />);
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
  });

  test("Post button should not be disabled by default because there is already text", () => {
    const toggleModal = vi.fn();
    setup(<EditPostModal toggleModal={toggleModal} post={post} />);

    const postButton = screen.getByRole("button", { name: /post/i });
    expect(postButton).not.toHaveAttribute("disabled");
  });

  test("Disables post button once user deletes post text", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(
      <EditPostModal toggleModal={toggleModal} post={post} />
    );

    const postButton = screen.getByRole("button", { name: /post/i });
    const input = screen.getByRole("textbox");
    await user.clear(input);

    expect(postButton).toHaveAttribute("disabled");
  });
  test("if modal is closed when 'Post' button is clicked", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(
      <EditPostModal toggleModal={toggleModal} post={post} />
    );
    const postButton = screen.getByRole("button", { name: /post/i });
    await user.click(postButton);
    expect(toggleModal).toHaveBeenCalled();
  });
  test("if image upload button works correctly", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(
      <EditPostModal toggleModal={toggleModal} post={post} />
    );
    const imageUploadButton = screen.getByLabelText("Add picture");
    const file = new File(["test image"], "images/optimistictrousers.jpg", {
      type: "image/jpg",
    });
    expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
    await user.upload(imageUploadButton, file);
    expect(screen.getByAltText("Preview image")).toBeInTheDocument();
  });
  // test("that the image upload button displays an error message when the file is too big", async () => {
  //   const toggleModal = vi.fn();
  //   const { user } = setup(
  //     <ToastProvider>
  //       <EditPostModal toggleModal={toggleModal} post={post} />
  //     </ToastProvider>
  //   );
  //   const imageUploadButton = screen.getByLabelText("Add picture");
  //   const file = new File(["test image"], "images/massive.jpg", {
  //     type: "image/jpg",
  //   });
  //   await user.upload(imageUploadButton, file);
  //   expect(screen.getByAltText("Preview image")).toBeInTheDocument();
  // });
  test("that the image is removed once the user clicks the 'X' button", async () => {
    const toggleModal = vi.fn();
    const { user } = setup(
      <EditPostModal toggleModal={toggleModal} post={post} />
    );
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
