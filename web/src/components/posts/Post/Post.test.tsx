import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../../context/AuthContext";
import Post from "./Post";

let mockLoading: any = false;
let mockComments: any = [];
let mockError: any = null;

const luffyId = "4c8a331bda76c559ef000004";
const namiId = "4c8a331bda76c559ef000007";
const zoroId = "4c8a331bda76c559ef000005";
const zoroPostId = "4c8a331bda76c559ef000010";
const luffyPostId = "4c8a331bda76c559ef000009";

const luffy = {
  _id: luffyId,
  fullName: "Monkey D. Luffy",
  userName: "luffy",
  email: "luffy@onepiece.com",
  password: "$2a$10$kny8gRPTSs215f9gc6SJ4.QjiBHa0/E6H6p6y0dvWUrXMzgprQxqy",
  bio: "I'm going to be the King of the Pirates!",
  photo: {
    imageUrl: `${import.meta.env.VITE_S3_BUCKET}/users/luffy.webp`,
    altText: "Fictional character Monkey D. Luffy from the One Piece manga",
  },
};

const zoro = {
  _id: zoroId,
  fullName: "Roronoa Zoro",
  userName: "zoro",
  email: "zoro@onepiece.com",
  password: "$2a$10$qCPh8/C30SpOOrjkaavXquYiqvv5SmQXQNdPgvtasqB9eaJxGDDY.",
  photo: {
    imageUrl: `${import.meta.env.VITE_S3_BUCKET}/users/zoro.webp`,
    altText: "Fictional character Roronoa Zoro from the One Piece manga",
  },
};

const nami = {
  _id: namiId,
  fullName: "Nami",
  userName: "nami",
  email: "nami@onepiece.com",
  password: "$2a$10$LireFRYIV1YJgzWeHoFG3.iVM.PMWKILHITKmgApmMEfl4fAjDgvu",
  photo: {
    imageUrl: `${import.meta.env.ViTE_S3_BUCKET}/users/nami.webp`,
    altText: "Fictional character Nami from the One Piece manga",
  },
};

const luffyPost = {
  _id: luffyPostId,
  author: luffyId,
  content: "MEAT!",
  likes: [zoro, nami, luffy],
};

const zoroPost = {
  _id: zoroPostId,
  author: zoroId,
  content: "Three-Sword Style",
  likes: [],
  photo: {
    imageUrl: `${
      import.meta.env.VITE_S3_BUCKET
    }/posts/4c8a331bda76c559ef000010_zoro.webp`,
    altText: "Roronoa Zoro using three swords",
  },
};

// luffy's comment on zoro's post
const luffyComment = {
  _id: "4c8a331bda76c559ef000014",
  post: zoroPostId,
  author: luffyId,
  content: "Four-Sword Style",
};

// nami's comment on zoro's post
const namiComment = {
  _id: "4c8a331bda76c559ef000017",
  post: zoroPostId,
  author: luffyId,
  content: "Moss head",
};

vi.mock("../../../hooks/useFetch", () => {
  return {
    default: vi.fn(() => ({
      data: [luffyComment, namiComment],
      loading: mockLoading,
      error: mockError,
    })),
  };
});

describe("Post component", () => {
  describe("Text-only posts", () => {
    test("Does not attempt to display image when no image url exists for the post", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: luffy }}>
            <Post post={{ ...luffyPost, photo: undefined }} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      // Image posts will have blank alt text
      const photo = screen.queryByAltText("Roronoa Zoro using three swords");
      expect(photo).not.toBeInTheDocument();
    });
  });
  describe("Image-containing posts", () => {
    test("Displays post image when url exists for the post", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: zoro }}>
            <Post post={zoroPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      // Image posts will have blank alt text
      const photo = screen.getByAltText("Roronoa Zoro using three swords");
      expect(photo).toBeInTheDocument();
    });
  });
  describe("All posts", () => {
    test("if clicking on the like count button opens the modal for likes", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: luffy }}>
            <Post post={luffyPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );

      const likeCountButton = screen.getByRole("button", { name: "3 likes" });
      await user.click(likeCountButton);

      const likesModal = screen.queryByRole("dialog");
      expect(likesModal).toBeInTheDocument();
    });
    test("Does not display post menu btn on other people's post", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: zoro }}>
            <Post post={luffyPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const button = screen.queryByRole("menu");
      expect(button).not.toBeInTheDocument();
    });
    test("Display correct comment count for two comments", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: zoro }}>
            <Post post={zoroPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const commentsButton = screen.getByRole("button", { name: "2 comments" });
      expect(commentsButton).toBeInTheDocument();
    });
    test("Displays correct like count for 3 likes", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: luffy }}>
            <Post post={luffyPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const likeButton = screen.getByRole("button", { name: "3 likes" });
      expect(likeButton).toBeInTheDocument();
    });
    test("Hides comments section by default", () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: luffy }}>
            <Post post={luffyPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );
      const comments = screen.queryByTestId(/comments/i);
      expect(comments).toHaveStyle({ maxHeight: "0px" });
      expect(comments).not.toBeVisible();
    });
    test("Shows comments section upon clicking comments button", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: luffy }}>
            <Post post={luffyPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );

      const commentsButton = screen.getByRole("button", { name: "2 comments" });
      await user.click(commentsButton);

      const comments = await screen.findByTestId("comments");
      expect(comments).toBeVisible();
    });
    test("Increases local like count when clicking like button", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user: luffy }}>
            <Post post={zoroPost} />
          </AuthContext.Provider>
        </BrowserRouter>
      );

      const likeCount = screen.getByText("0 likes");
      expect(likeCount).toBeInTheDocument();
      const likeButton = screen.getByRole("button", { name: "Like" });
      await user.click(likeButton);

      const updatedLikeCount = screen.getByText("1 like");

      expect(updatedLikeCount).toBeInTheDocument();
      expect(likeButton).toHaveAccessibleName("Liked");
    });
    // test("if it renders the correct text if loading and the user is unliking", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: luffy }}>
    //         <Post post={luffyPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );
    //   const likeButton = screen.getByRole("button", { name: "Unliking.." });
    //   expect(likeButton).toBeInTheDocument();
    // });
    // test("if it renders the correct text if loading and the user is liking", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: zoro }}>
    //         <Post post={zoroPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );
    //   const likeButton = screen.getByRole("button", { name: "Liking.." });
    //   expect(likeButton).toBeInTheDocument();
    // });
    // test("if it renders the correct text if liked", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: luffy }}>
    //         <Post post={luffyPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );
    //   const likeButton = screen.getByRole("button", { name: "Liked" });
    //   expect(likeButton).toBeInTheDocument();
    // });
    // test("if it renders the correct text if not liked", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: zoro }}>
    //         <Post post={zoroPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );
    //   const likeButton = screen.getByRole("button", { name: "Like" });
    //   expect(likeButton).toBeInTheDocument();
    // });
    // test("if it increases the amount of comments when one is created", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: zoro }}>
    //         <Post post={luffyPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );

    //   const commentsDropdownButton = screen.getByRole("button", {
    //     name: "Comment",
    //   });

    //   await user.click(commentsDropdownButton);

    //   const commentsInput = screen.getByRole("textbox");

    //   await user.type(commentsInput, "test post");

    //   const commentSaveButton = screen.getByRole("button", { name: "Post" });
    //   await user.click(commentSaveButton);
    //   const commentsButton = screen.getByRole("button", { name: "4 comments" });
    //   expect(commentsButton).toBeInTheDocument();
    // });
    // test("if it decreases the amount of comments when one is deleted", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: nami }}>
    //         <Post post={zoroPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );

    //   const commentsDeleteButton = screen.getAllByRole("button", {
    //     name: "Comment",
    //   })[0];

    //   await user.click(commentsDeleteButton);
    //   const commentsButton = screen.getByRole("button", { name: "2 comments" });
    //   expect(commentsButton).toBeInTheDocument();
    // });
    // test("if the comment count does not change if a comment is edited", async () => {
    //   const user = userEvent.setup();
    //   render(
    //     <BrowserRouter>
    //       <AuthContext.Provider value={{ user: nami }}>
    //         <Post post={zoroPost} />
    //       </AuthContext.Provider>
    //     </BrowserRouter>
    //   );

    //   const commentsEditButton = screen.getAllByRole("button", {
    //     name: "Edit",
    //   })[0];
    //   await user.click(commentsEditButton);

    //   const commentsInput = screen.getByRole("textbox");
    //   await user.type(commentsInput, "test post");

    //   const commentSaveButton = screen.getByRole("button", { name: "Save" });
    //   await user.click(commentSaveButton);
    //   const commentsButton = screen.getByRole("button", { name: "3 comments" });
    //   expect(commentsButton).toBeInTheDocument();
    // });
    // test("that deleting the post gets rid of the post in local state", () => {

    // })
    // test("that editing the post updates the post in local state", () => {

    // })
  });
});
