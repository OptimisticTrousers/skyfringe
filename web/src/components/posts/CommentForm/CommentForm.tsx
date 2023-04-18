import { FC, useRef, useState } from "react";
import CSSModules from "react-css-modules";
import { CommentData } from "../../../types";
import styles from "./CommentForm.module.css";

interface Props {
  isCommentFormOpen: boolean;
  commentLoading: boolean;
  createComment: any;
  postId: string;
}

const CommentForm: FC<Props> = ({
  isCommentFormOpen,
  commentLoading,
  createComment,
  postId,
}) => {
  const formRef = useRef<any>(null);
  const [commentText, setCommentText] = useState("");

  const handleCommentText = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createComment(postId, { content: commentText });
  };

  return (
    <form
      onSubmit={handleSubmit}
      styleName="form"
      name="form"
      ref={formRef}
      style={
        isCommentFormOpen
          ? {
              height: "132px",
              paddingTop: "2px",
              paddingBottom: "2px",
              visibility: "visible",
            }
          : {
              height: "0px",
              paddingTop: "0px",
              paddingBottom: "0px",
              visibility: "hidden",
            }
      }
    >
      <textarea
        value={commentText}
        onChange={handleCommentText}
        styleName="form__input"
        placeholder="Leave a comment..."
      ></textarea>
      <button styleName="form__button" disabled={commentLoading} type="submit">
        {commentLoading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CSSModules(CommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
