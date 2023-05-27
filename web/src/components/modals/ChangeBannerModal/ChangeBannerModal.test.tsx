import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


const updateUserMock = vi.fn();
let updateUserLoading = false;
let updateUserError: any = null;

// vi.mock("../../../hooks/useUpdateUser", () => {
//   return {
//     default: vi.fn(() => ({
//       updateUser: updateUserMock,
//       loading: updateUserLoading,
//       error: updateUserError,
//     })),
//   };
// });

// describe("ChangeAvatarModal component", () => {
//   test("if correct button text is rendered when loading is false", () => {
//     updatePostLoading = false;
//     const toggleModal = vi.fn();
//     const handleEditPostMock = vi.fn();
//     const { user } = setup(
//       <EditPostModal
//         toggleModal={toggleModal}
//         post={post}
//         handleEditPost={handleEditPostMock}
//       />
//     );
//     const postButton = screen.getByRole("button", { name: "Post" });
//     expect(postButton).toBeInTheDocument();
//   });
//   test("if correct button text is rendered when loading is true", () => {
//     updatePostLoading = true;
//     const toggleModal = vi.fn();
//     const handleEditPostMock = vi.fn();
//     const { user } = setup(
//       <EditPostModal
//         toggleModal={toggleModal}
//         post={post}
//         handleEditPost={handleEditPostMock}
//       />
//     );
//     const postButton = screen.getByRole("button", { name: "Posting..." });
//     expect(postButton).toBeInTheDocument();
//   });
// });
