import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MoreOptionsDropdown from "./MoreOptionsDropdown";

describe("MoreOptionsDropdown component", () => {
  test("Calls deletePost function on when clicking the delete option");
  const deletePostMock = jest.fn();
  render(
    <MoreOptionsDropdown
      closeMenu={jest.fn}
      handleDelete={deletePostMock}
      handleEdit={jest.fn}
    />
  );

  const deleteButton = screen.getByRole("menuitem", { name: /delete/i });
  userEvent.click(deleteButton);

  expect(deletePostMock).toHaveBeenCalledTimes(1);
});
