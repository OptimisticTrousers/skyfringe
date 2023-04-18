import CSSModules from "react-css-modules";
import styles from "./EditComment.module.css";

const EditCommentForm = () => {
  return (
    <form styleName="form">
      <textarea
        styleName="form__input"
        placeholder="Edit your comment..."
      ></textarea>
      <div styleName="form__emoji"></div>
      <button styleName="form__button" type="button">
        Save
      </button>
    </form>
  );
};

export default CSSModules(EditCommentForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
