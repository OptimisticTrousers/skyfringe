import React from "react";
import {
  getByLabelText,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePost from "./CreatePost";

describe("CreatePost component", async () => {
  test("opening modal", () => {

    // Arrange
    const toggleModal = jest.fn();

    // Act
    const { getByText } = render(<CreatePost />);

    // Assert
    expect(getByText("Create Post")).toBeTruthy();

    // Act
    const user = userEvent.setup()
    await user.click(getByText())
  });
});
