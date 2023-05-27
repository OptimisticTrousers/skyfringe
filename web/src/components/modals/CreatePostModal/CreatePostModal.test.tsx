import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ToastContext, ToastProvider } from "../../../context/ToastContext";
import CreatePostModal from "./CreatePostModal";

// const createPostMock = vi.fn();
// let createPostLoading = false;
// let createPostError: any = null;

// vi.mock("../../../hooks/useCreatePost", () => {
//   return {
//     default: vi.fn(() => ({
//       createPost: createPostMock,
//       loading: createPostLoading,
//       error: createPostError,
//     })),
//   };
// });

// describe("CreatePostModal component", () => {
//   const setup = (jsx: JSX.Element) => {
//     return {
//       user: userEvent.setup(),
//       ...render(jsx),
//     };
//   };

//   test("if modal title is 'Create Post'", () => {
//     const toggleModal = vi.fn();
//     setup(<CreatePostModal toggleModal={toggleModal} />);
//     expect(screen.getByText("Create Post")).toBeInTheDocument();
//   });

//   test("Disables post button by default", () => {
//     const toggleModal = vi.fn();
//     setup(<CreatePostModal toggleModal={toggleModal} />);

//     const postButton = screen.getByRole("button", { name: /post/i });
//     expect(postButton).toHaveAttribute("disabled");
//   });

//   test("Enables post button once user enters post text", async () => {
//     createPostLoading = false;
//     const toggleModal = vi.fn();
//     const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);

//     const postButton = screen.getByRole("button", { name: "Post" });
//     const input = screen.getByRole("textbox");
//     await user.type(input, "test");

//     expect(postButton).not.toHaveAttribute("disabled");
//   });
//   test("if correct button text is rendered when loading is false", () => {
//     createPostLoading = false;
//     const toggleModal = vi.fn();
//     setup(<CreatePostModal toggleModal={toggleModal} />);
//     const postButton = screen.getByRole("button", { name: "Post" });
//     expect(postButton).toBeInTheDocument();
//   });
//   test("if correct button text is rendered when loading is true", () => {
//     createPostLoading = true;
//     const toggleModal = vi.fn();
//     setup(<CreatePostModal toggleModal={toggleModal} />);
//     const postButton = screen.getByRole("button", { name: "Posting..." });
//     expect(postButton).toBeInTheDocument();
//   });
//   test("if modal is closed when 'Post' button is clicked", async () => {
//     const toggleModal = vi.fn();
//     const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);
//     const postButton = screen.getByRole("button", { name: /post/i });
//     // Typing to make sure that the post button is disabled
//     const postText = screen.getByRole("textbox");
//     await user.type(postText, "test");
//     await user.click(postButton);
//     expect(toggleModal).toHaveBeenCalled();
//   });
//   test("if image upload button works correctly", async () => {
//     const toggleModal = vi.fn();
//     const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);
//     const imageUploadButton = screen.getByLabelText("Add picture");
//     const file = new File(["test image"], "optimistictrousers.jpg", {
//       type: "image/jpg",
//     });
//     expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
//     await user.upload(imageUploadButton, file);
//     expect(screen.getByAltText("Preview image")).toBeInTheDocument();
//   });
//   test("if image is correctly overriden", async () => {
//     const toggleModal = vi.fn();
//     const user = userEvent.setup();
//     render(<CreatePostModal toggleModal={toggleModal} />);

//     const imageUploadButton = screen.getByLabelText(
//       "Add picture"
//     ) as HTMLInputElement;
//     const file1 = new File(["test image 1"], "optimistictrousers.jpg", {
//       type: "image/jpg",
//     });

//     expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
//     await user.upload(imageUploadButton, file1);
//     expect(imageUploadButton.files![0]).toStrictEqual(file1);
//     expect(imageUploadButton.files).toHaveLength(1);
//     expect(screen.getByAltText("Preview image")).toBeInTheDocument();

//     const file2 = new File(["test image 2"], "heart.png", {
//       type: "image/png",
//     });
//     const clearPhotoButton = screen.getByLabelText("Remove image");
//     await user.click(clearPhotoButton);
//     expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();

//     await user.upload(imageUploadButton, file2);
//     expect(imageUploadButton.files![0]).toStrictEqual(file1);
//     expect(imageUploadButton.files).toHaveLength(1);
//     expect(screen.getByAltText("Preview image")).toBeInTheDocument();
//   });
//   test("that the image is removed once the user clicks the 'X' button", async () => {
//     const toggleModal = vi.fn();
//     const { user } = setup(<CreatePostModal toggleModal={toggleModal} />);
//     const imageUploadButton = screen.getByLabelText(
//       "Add picture"
//     ) as HTMLInputElement;
//     const file = new File(["test image"], "images/massive.jpg", {
//       type: "image/jpg",
//     });
//     await user.upload(imageUploadButton, file);
//     expect(imageUploadButton.files![0]).toStrictEqual(file);
//     expect(imageUploadButton.files!.item(0)).toStrictEqual(file);
//     expect(imageUploadButton.files).toHaveLength(1);
//     expect(screen.queryByAltText("Preview image")).toBeInTheDocument();
//     const removeImageButton = screen.getByRole("button", {
//       name: "Remove image",
//     });

//     await user.click(removeImageButton);
//     expect(screen.queryByAltText("Preview image")).not.toBeInTheDocument();
//     expect(imageUploadButton.files![0]).not.toStrictEqual(file);
//     expect(imageUploadButton.files!.item(0)).not.toStrictEqual(file);
//     expect(imageUploadButton.files).not.toHaveLength(1);
//   });
// });
