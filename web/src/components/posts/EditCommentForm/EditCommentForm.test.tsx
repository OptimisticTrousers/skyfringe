import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditCommentForm from "./EditCommentForm";

describe("EditCommentForm component", () => {
  const handleUpdateComment = vi.fn();
  let loading = false;
  const commentContent = "test comment";
  const newContent = "locos pollos";
  test("if it renders the form elements", () => {
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
        text={commentContent}
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
        text={commentContent}
      />
    );
    const input = screen.getByPlaceholderText("Edit your comment...");
    await user.clear(input);
    await user.type(input, "locos pollos");
    expect(input).toHaveValue("locos pollos");
  });
  test("if it handles form submission", async () => {
    const user = userEvent.setup();
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
        text={commentContent}
      />
    );
    const input = screen.getByPlaceholderText("Edit your comment...");
    const button = screen.getByRole("button", { name: "Save" });
    await user.clear(input);
    await userEvent.type(input, "locos pollos");
    await userEvent.click(button);
    expect(handleUpdateComment).toHaveBeenCalledWith("locos pollos");
  });
  test("if it disables the button while loading", () => {
    loading = true;
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
        text={commentContent}
      />
    );
    const button = screen.getByRole("button", { name: "Saving..." });
    expect(button).toBeDisabled();
  });
  test("if submit button is disabled when the text length is empty", async () => {
    const user = userEvent.setup();
    loading = false;
    render(
      <EditCommentForm
        handleUpdateComment={handleUpdateComment}
        loading={loading}
        text={commentContent}
      />
    );
    const input = screen.getByPlaceholderText("Edit your comment...");
    const button = screen.getByRole("button", { name: "Save" });
    await user.clear(input);

    expect(button).toBeDisabled();
  });
});
