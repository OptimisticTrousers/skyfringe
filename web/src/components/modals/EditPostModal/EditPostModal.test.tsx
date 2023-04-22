import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "../../../context/ToastContext";
import EditPostModal from "./EditPostModal";

const updatePostMock = vi.fn();
let updatePostLoading = false;
let updatePostError: any = null;

vi.mock("../../../hooks/useUpdatePost", () => {
  return {
    default: vi.fn(() => ({
      updatePost: updatePostMock,
      loading: updatePostLoading,
      error: updatePostError,
    })),
  };
});

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
    const handleEditPostMock = vi.fn();
    setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
  });

  test("Post button should not be disabled by default because there is already text", () => {
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );

    const postButton = screen.getByRole("button", { name: /post/i });
    expect(postButton).not.toHaveAttribute("disabled");
  });

  test("Disables post button once user deletes post text", async () => {
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );

    const postButton = screen.getByRole("button", { name: /post/i });
    const input = screen.getByRole("textbox") as HTMLTextAreaElement;
    await user.clear(input);

    expect(input.value).toBe("");

    expect(postButton).toHaveAttribute("disabled");
  });
  test("if correct button text is rendered when loading is false", () => {
    updatePostLoading = false;
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );
    const postButton = screen.getByRole("button", { name: "Post" });
    expect(postButton).toBeInTheDocument();
  });
  test("if correct button text is rendered when loading is true", () => {
    updatePostLoading = true;
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );
    const postButton = screen.getByRole("button", { name: "Posting..." });
    expect(postButton).toBeInTheDocument();
  });
  test("if modal is closed when 'Post' button is clicked and handleSubmit is called", async () => {
    updatePostLoading = false;
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );
    const postButton = screen.getByRole("button", { name: "Post" });
    await user.click(postButton);
    expect(toggleModal).toHaveBeenCalled();
    expect(handleEditPostMock).toHaveBeenCalled();
  });
  test("if image upload button works correctly", async () => {
    updatePostLoading = false;
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );
    const imageUploadButton = screen.getByLabelText("Add picture");
    const file = new File(["test image"], "images/optimistictrousers.jpg", {
      type: "image/jpg",
    });
    expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
    await user.upload(imageUploadButton, file);
    expect(screen.getByAltText("Preview image")).toBeInTheDocument();
  });
  test("if image is correctly overriden", async () => {
    updatePostLoading = false;
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
    );

    const imageUploadButton = screen.getByLabelText(
      "Add picture"
    ) as HTMLInputElement;
    const file1 = new File(["test image 1"], "optimistictrousers.jpg", {
      type: "image/jpg",
    });

    expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
    await user.upload(imageUploadButton, file1);
    expect(imageUploadButton.files![0]).toStrictEqual(file1);
    expect(imageUploadButton.files).toHaveLength(1);
    expect(screen.getByAltText("Preview image")).toBeInTheDocument();

    const file2 = new File(["test image 2"], "heart.png", {
      type: "image/png",
    });
    const clearPhotoButton = screen.getByLabelText("Remove image");
    await user.click(clearPhotoButton);
    expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();

    await user.upload(imageUploadButton, file2);
    expect(imageUploadButton.files![0]).toStrictEqual(file1);
    expect(imageUploadButton.files).toHaveLength(1);
    expect(screen.getByAltText("Preview image")).toBeInTheDocument();
  });
  test("that the image is removed once the user clicks the 'X' button", async () => {
    updatePostLoading = false;
    const toggleModal = vi.fn();
    const handleEditPostMock = vi.fn();
    const { user } = setup(
      <EditPostModal
        toggleModal={toggleModal}
        post={post}
        handleEditPost={handleEditPostMock}
      />
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
