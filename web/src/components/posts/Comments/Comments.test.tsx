import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Comments from "./Comments";

describe("Comments component", () => {
  it("renders closed when isCommentsOpen is false", () => {
    render(
      <BrowserRouter>
        <Comments
          isCommentsOpen={false}
          comments={[]}
          loading={false}
          error={null}
          deleteLocalComment={vi.fn}
          editLocalComment={vi.fn}
        />
      </BrowserRouter>
    );
    const comments = screen.getByTestId("comments");
    expect(comments).toHaveStyle({ maxHeight: "0px" });
    expect(comments).not.toBeVisible();
  });

  it("renders open when isCommentsOpen is true", () => {
    render(
      <BrowserRouter>
        <Comments
          isCommentsOpen={true}
          comments={[]}
          loading={false}
          error={null}
          deleteLocalComment={vi.fn}
          editLocalComment={vi.fn}
        />
      </BrowserRouter>
    );
    const comments = screen.getByTestId("comments");
    expect(comments).toHaveStyle({ maxHeight: "50vh", overflowY: "scroll" });
    expect(comments).toBeVisible();
  });
});
