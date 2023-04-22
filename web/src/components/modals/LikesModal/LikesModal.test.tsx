import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LikesModal from "./LikesModal";

describe("LikesModal component", () => {
  const zoroId = "4c8a331bda76c559ef000005";
  const namiId = "4c8a331bda76c559ef000006";
  const usoppId = "4c8a331bda76c559ef000007";

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
  };

  const usopp = {
    _id: usoppId,
    fullName: "Usopp",
    userName: "usopp",
    email: "usopp@onepiece.com",
    password: "$2a$10$p27n84..B5CTA.of5JUS3e7jNvpSns82qrv6oR4WAwtImCaw7Zuui",
  };

  const mockPostWithPhoto = {
    _id: "4c8a331bda76c559ef000009",
    author: "4c8a331bda76c559ef000004",
    content: "MEAT!",
    likes: [zoro, nami, usopp],
    photo: {
      imageUrl: `${
        import.meta.env.VITE_S3_BUCKET
      }/posts/4c8a331bda76c559ef000009_luffy.webp`,
      altText: "Monkey D. Luffy eating meat",
    },
  };

  const mockPostWithoutLikesAndPhoto = {
    _id: "4c8a331bda76c559ef000010",
    author: zoro,
    content: "Three Sword Style",
    likes: [],
  };

  const mockPostWithoutPhoto = {
    _id: "4c8a331bda76c559ef000011",
    author: usopp,
    content: "Captain Usopp",
    likes: [zoro],
  };

  const toggleModalMock = vi.fn();
  it("returns the correct text for 0 likes", () => {
    render(
      <BrowserRouter>
        <LikesModal
          toggleModal={toggleModalMock}
          post={mockPostWithoutLikesAndPhoto}
        />
      </BrowserRouter>
    );
    const likeCount = screen.getByText("0 likes");

    expect(likeCount).toBeInTheDocument();
  });
  it("returns the correct text for 1 like", () => {
    render(
      <BrowserRouter>
        <LikesModal toggleModal={toggleModalMock} data={mockPostWithoutPhoto} />
      </BrowserRouter>
    );
    const likeCount = screen.getByText("1 like");

    expect(likeCount).toBeInTheDocument();
  });
  it("returns the correct text for 3 likes", () => {
    render(
      <BrowserRouter>
        <LikesModal toggleModal={toggleModalMock} data={mockPostWithPhoto} />
      </BrowserRouter>
    );
    const likeCount = screen.getByText("3 likes");

    expect(likeCount).toBeInTheDocument();
  });
  it("returns the correct number of users", () => {
    render(
      <BrowserRouter>
        <LikesModal toggleModal={toggleModalMock} data={mockPostWithPhoto} />
      </BrowserRouter>
    );
    const users = screen.getAllByRole("menuitem");

    expect(users).toHaveLength(3);
  });
  test("if it renders the correct name", () => {
    render(
      <BrowserRouter>
        <LikesModal toggleModal={toggleModalMock} data={mockPostWithoutPhoto} />
      </BrowserRouter>
    );
    const zoro = screen.getByText("Roronoa Zoro");

    expect(zoro).toBeInTheDocument();
  });
  test("if avatar is rendered if there is an avatar", () => {
    render(
      <BrowserRouter>
        <LikesModal toggleModal={toggleModalMock} data={mockPostWithoutPhoto} />
      </BrowserRouter>
    );
    const zoroAvatar = screen.getByAltText(
      "Fictional character Roronoa Zoro from the One Piece manga"
    );

    expect(zoroAvatar).toBeInTheDocument();
  });
  test("if avatar is not rendered if there is no avatar", () => {
    render(
      <BrowserRouter>
        <LikesModal toggleModal={toggleModalMock} data={mockPostWithPhoto} />
      </BrowserRouter>
    );

    // anonymous avatars from nami and usopp
    const anonymousAvatars = screen.getAllByAltText("Anonymous user avatar");
    expect(anonymousAvatars).toHaveLength(2);
  });
});
