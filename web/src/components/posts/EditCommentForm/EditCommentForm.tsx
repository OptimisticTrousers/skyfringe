import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./EditCommentForm.module.css";

interface Props {
  handleUpdateComment: any;
  loading: any;
}

const EditCommentForm: FC<Props> = ({ handleUpdateComment, loading }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentText = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = () => {
    handleUpdateComment(commentText);
  };

  return (
    <form styleName="form" onSubmit={handleSubmit}>
      <textarea
        styleName="form__input"
        placeholder="Edit your comment..."
        onChange={handleCommentText}
        value={commentText}
      ></textarea>
      <div styleName="form__emoji"></div>
      <button styleName="form__button" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CSSModules(EditCommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
