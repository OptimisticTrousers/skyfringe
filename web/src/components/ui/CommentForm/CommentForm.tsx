import { FC, useRef } from "react";
import CSSModules from "react-css-modules";
import styles from "./CommentForm.module.css";

interface Props {
  isCommentsOpen: boolean;
}

const CommentForm: FC<Props> = ({ isCommentsOpen }) => {
  const formRef = useRef<any>(null);
  return (
    <form
      styleName={`form ${!isCommentsOpen && "form--invisible"}`}
      ref={formRef}
      style={
        isCommentsOpen
          ? {
              height: formRef.current.scrollHeight + "px",
            }
          : { height: "0px" }
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
