import { FC, useRef } from "react";
import CSSModules from "react-css-modules";
import styles from "./CommentForm.module.css";

interface Props {
  isCommentFormOpen: boolean;
}

const CommentForm: FC<Props> = ({ isCommentFormOpen}) => {
  const formRef = useRef<any>(null);
  return (
    <form
      styleName="form"
      ref={formRef}
      style={
        isCommentFormOpen
          ? {
              height: "132px",
              paddingTop: "2px",
              paddingBottom: "2px",
            }
          : { height: "0px", paddingTop: "0px", paddingBottom: "0px" }
      }
    >
      <textarea
        styleName="form__input"
        placeholder="Leave a comment..."
      ></textarea>
      <button styleName="form__button">Post</button>
    </form>
  );
};

export default CSSModules(CommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
