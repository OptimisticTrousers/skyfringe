import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./EditCommentForm.module.css";

interface Props {
  handleUpdateComment: any;
  loading: any;
  text: any;
}

const EditCommentForm: FC<Props> = ({ handleUpdateComment, loading, text }) => {
  const [commentText, setCommentText] = useState(text);

  const handleCommentText = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = () => {
    handleUpdateComment(commentText);
  };

  const disabled = loading || commentText.length === 0;

  return (
    <form styleName="form" onSubmit={handleSubmit}>
      <textarea
        styleName="form__input"
        placeholder="Edit your comment..."
        onChange={handleCommentText}
        value={commentText}
      ></textarea>
      <div styleName="form__emoji"></div>
      <button styleName="form__button" type="submit" disabled={disabled}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CSSModules(EditCommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
