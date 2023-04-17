import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MoreOptionsDropdown from "./MoreOptionsDropdown";

describe("MoreOptionsDropdown component", () => {
  const correctUser = {
    _id: "456",
    fullName: "John Doe",
    password: "johndoe",
    email: "johndoe@gmail.com",
    userName: "johndoe",
    createdAt: new Date(),
    updatedAt: new Date(),
    friends: [],
    friendRequests: [],
    photo: {
      imageUrl: "https://example.com/johndoe.jpg",
      altText: "test user",
    },
  };
  const mockPost = {
    _id: "4c8a331bda76c559ef000009",
    author: correctUser,
    likes: ["4c8a331bda76c559ef000009"],
    content: "This is a test post.",
    createdAt: new Date(),
    updatedAt: new Date(),
    photo: {
      imageUrl: "https://example.com/test.jpg",
      altText: "test post",
    },
  };
  const closeDropdownMock = vi.fn();
  const toggleDropdownMock = vi.fn();
  test("if dropdown is not hidden by default", () => {
    render(
      <MoreOptionsDropdown
        post={mockPost}
        closeDropdown={closeDropdownMock}
        toggleDropdown={toggleDropdownMock}
        isDropdownOpen={true}
      />
    );
    const dropdownMenu = screen.getByRole("menu");
    expect(dropdownMenu).toBeInTheDocument();
  });
  test("if dropdown is hidden by default", () => {
    render(
      <MoreOptionsDropdown
        post={mockPost}
        closeDropdown={closeDropdownMock}
        toggleDropdown={toggleDropdownMock}
        isDropdownOpen={false}
      />
    );
    const dropdownMenu = screen.queryByRole("menu");
    expect(dropdownMenu).not.toBeInTheDocument();
  });
  test("that all modals should be hidden by default", () => {
    render(
      <MoreOptionsDropdown
        post={mockPost}
        closeDropdown={closeDropdownMock}
        toggleDropdown={toggleDropdownMock}
        isDropdownOpen={true}
      />
    );

    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
  test("if the delete modal is present when 'Delete post' is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MoreOptionsDropdown
        post={mockPost}
        closeDropdown={closeDropdownMock}
        toggleDropdown={toggleDropdownMock}
        isDropdownOpen={true}
      />
    );

    const deleteButton = screen.getByRole("menuitem", { name: "Delete post" });

    await user.click(deleteButton);

    const modalTitle = screen.getByText("Delete Post");
    expect(modalTitle).toBeInTheDocument();
  });
  test("if the edit modal is present when 'Edit post' is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MoreOptionsDropdown
        post={mockPost}
        closeDropdown={closeDropdownMock}
        toggleDropdown={toggleDropdownMock}
        isDropdownOpen={true}
      />
    );

    const editButton = screen.getByRole("menuitem", { name: "Edit post" });

    await user.click(editButton);

    const modalTitle = screen.getByText("Edit Post");
    expect(modalTitle).toBeInTheDocument();
  });
  test("if pressing escape closes the dropdown", async () => {
    const user = userEvent.setup();
    const closeDropdownMock = vi.fn();
    render(
      <MoreOptionsDropdown
        post={mockPost}
        closeDropdown={closeDropdownMock}
        toggleDropdown={toggleDropdownMock}
        isDropdownOpen={true}
      />
    );

    await user.keyboard("{Escape}");

    expect(closeDropdownMock).toHaveBeenCalledTimes(1);
  });
  test("if pressing div outside of the dropdown menu closes the dropdown", async () => {
    const user = userEvent.setup();
    const closeDropdownMock = vi.fn();
    render(
      <>
        <MoreOptionsDropdown
          post={mockPost}
          closeDropdown={closeDropdownMock}
          toggleDropdown={toggleDropdownMock}
          isDropdownOpen={true}
        />
        <div data-testid="test"></div>
      </>
    );

    const randomDiv = screen.getByTestId("test");

    await user.click(randomDiv);

    expect(closeDropdownMock).toHaveBeenCalledTimes(1);
  });
  describe("Accessible keyboard menu navigation", () => {
    it("Focuses first item on menu open", () => {
      render(
        <MoreOptionsDropdown
          post={mockPost}
          closeDropdown={closeDropdownMock}
          toggleDropdown={toggleDropdownMock}
          isDropdownOpen={true}
        />
      );

      const firstItem = screen.getByRole("menuitem", { name: "Edit post" });

      expect(document.activeElement).toEqual(firstItem);
    });

    it("Moves focus down the list on down arrow key press", async () => {
      const user = userEvent.setup();
      render(
        <MoreOptionsDropdown
          post={mockPost}
          closeDropdown={closeDropdownMock}
          toggleDropdown={toggleDropdownMock}
          isDropdownOpen={true}
        />
      );

      const secondItem = screen.getByRole("menuitem", { name: "Delete post" });

      // Move down the menu
      await user.keyboard("{ArrowDown}");

      expect(document.activeElement).toEqual(secondItem);
    });

    it("Moves focus up the list on up arrow key press", async () => {
      const user = userEvent.setup();
      render(
        <MoreOptionsDropdown
          post={mockPost}
          closeDropdown={closeDropdownMock}
          toggleDropdown={toggleDropdownMock}
          isDropdownOpen={true}
        />
      );

      const firstItem = screen.getByRole("menuitem", { name: "Edit post" });
      const secondItem = screen.getByRole("menuitem", { name: "Delete post" });

      // Set focus on bottom of menu to start
      await user.keyboard("{ArrowDown}");

      // Move up the menu
      await user.keyboard("{ArrowUp}");

      expect(document.activeElement).toEqual(firstItem);
    });

    it("Down arrow moves focus to top of list when starting at the bottom", async () => {
      const user = userEvent.setup();
      render(
        <MoreOptionsDropdown
          post={mockPost}
          closeDropdown={closeDropdownMock}
          toggleDropdown={toggleDropdownMock}
          isDropdownOpen={true}
        />
      );

      const firstItem = screen.getByRole("menuitem", { name: "Edit post" });
      const secondItem = screen.getByRole("menuitem", { name: "Delete post" });

      // Set focus on bottom of menu to start
      await user.keyboard("{ArrowDown}");

      // Move to the top of menu
      await user.keyboard("{ArrowDown}");

      expect(document.activeElement).toEqual(firstItem);
    });

    it("Up arrow moves to bottom of list when already at top of list to begin", async () => {
      const user = userEvent.setup();
      render(
        <MoreOptionsDropdown
          post={mockPost}
          closeDropdown={closeDropdownMock}
          toggleDropdown={toggleDropdownMock}
          isDropdownOpen={true}
        />
      );

      const secondItem = screen.getByRole("menuitem", { name: "Delete post" });

      // Move up the menu
      await user.keyboard("{ArrowUp}");

      expect(document.activeElement).toEqual(secondItem);
    });
  });
});
