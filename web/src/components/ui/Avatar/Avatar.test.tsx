import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Avatar from "./Avatar";

describe("Avatar component", () => {
  test("if it renders the correct avatar", () => {
    render(
      <Avatar
        src={"/images/optimistictrousers.jpg"}
        alt={"smiling pants"}
        size={"sm"}
      />
    );

    const avatar = screen.getByAltText("smiling pants");
    expect(avatar).toBeInTheDocument();
  });
  test("if it renders the anonymous avatar if no avatar is provided", () => {
    render(<Avatar src={"/images/invalid-image.jpg"} alt={""} size={"sm"} />);

    const avatar = screen.getByAltText("Anonymous user avatar");
    expect(avatar).toBeInTheDocument();
  });
});
