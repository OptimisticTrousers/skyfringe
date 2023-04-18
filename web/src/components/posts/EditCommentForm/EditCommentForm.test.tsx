import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditCommentForm from "./EditCommentForm";

describe("EditCommentForm component", () => {
  const handleUpdateComment = vi.fn();
  let loading = false;
  const commentContent = "test comment";
  test("if it renders the form elements", () => {
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
      />
    );
    expect(
      screen.getByPlaceholderText("Edit your comment...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
  test("if it handles text input", async () => {
    const user = userEvent.setup();
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
      />
    );
    const input = screen.getByPlaceholderText("Edit your comment...");
    await user.type(input, commentContent);
    expect(input).toHaveValue(commentContent);
  });
  test("if it handles form submission", async () => {
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
      />
    );
    const input = screen.getByPlaceholderText("Edit your comment...");
    const button = screen.getByRole("button", { name: "Save" });
    await userEvent.type(input, commentContent);
    await userEvent.click(button);
    expect(handleUpdateComment).toHaveBeenCalledWith("test comment");
  });
  test("if it disables the button while loading", () => {
    loading = true;
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
      />
    );
    const button = screen.getByRole("button", { name: "Saving..." });
    expect(button).toBeDisabled();
  });
});
