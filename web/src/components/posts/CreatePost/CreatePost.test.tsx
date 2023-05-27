import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CreatePost from "./CreatePost";
import { AuthContext } from "../../../context/AuthContext";

// describe("CreatePost component", () => {
//   const bobJones = {
//     _id: "4c8a331bda76c559ef000006",
//     fullName: "Bob Jones",
//     userName: "bobjones",
//     email: "bobjones@gmail.com",
//   };
//   test("Hides modal by default", () => {
//     render(
//       <AuthContext.Provider value={{ user: bobJones }}>
//         <CreatePost />
//       </AuthContext.Provider>
//     );

//     expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
//   });
//   test("Shows modal when clicking create post button", async () => {
//     const user = userEvent.setup();
//     render(
//       <AuthContext.Provider value={{ user: bobJones }}>
//         <CreatePost />
//       </AuthContext.Provider>
//     );

//     // Click the create post button to reveal the add post form
//     const createPostButton = screen.getByRole("button");

//     await user.click(createPostButton);

//     const createPostModal = screen.getByRole("dialog");
//     expect(createPostModal).toBeInTheDocument();
//   });
//   test("renders correct text", () => {
//     render(
//       <AuthContext.Provider value={{ user: bobJones }}>
//         <CreatePost />
//       </AuthContext.Provider>
//     );

//     const message = screen.getByText("What's on your mind, bobjones? Write a post or upload a picture!");

//     expect(message).toBeInTheDocument();
//   });
// });
