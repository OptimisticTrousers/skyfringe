import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentForm from "./CommentForm";

describe("CommentForm", () => {
  const createCommentMock = vi.fn();

  const props = {
    isCommentFormOpen: true,
    commentLoading: false,
    createComment: createCommentMock,
    postId: "1",
  };

  it("should update the comment text when typing in the textarea", async () => {
    const user = userEvent.setup();
    render(<CommentForm {...props} />);
    const textarea = screen.getByPlaceholderText("Leave a comment...");
    await user.type(textarea, "test comment");
    expect(textarea).toHaveValue("test comment");
  });

  it("should call createComment with the correct arguments when submitting the form", async () => {
    const user = userEvent.setup();
    render(<CommentForm {...props} />);
    const textarea = screen.getByPlaceholderText("Leave a comment...");
    const button = screen.getByRole("button", { name: "Post" });
    await user.type(textarea, "test comment");
    await user.click(button);
    expect(createCommentMock).toHaveBeenCalledWith("1", {
      content: "test comment",
    });
  });

  it('should show "Commenting..." text on the button when commentLoading is true', () => {
    render(<CommentForm {...props} commentLoading={true} />);
    const button = screen.getByText("Posting...");
    expect(button).toBeInTheDocument();
  });

  it("should not render the form when isCommentFormOpen is false", () => {
    render(<CommentForm {...props} isCommentFormOpen={false} />);
    const form = screen.getByRole("form", { hidden: true });
    expect(form).not.toBeVisible();
  });
});
