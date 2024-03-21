import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import EmojiPickerBtn from "../../ui/EmojiPickerBtn";
import styles from "./EditCommentForm.module.css";

interface Props {
  handleUpdateComment: any;
  loading: any;
  text: any;
  position: number;
}

const EditCommentForm: FC<Props> = ({ handleUpdateComment, loading, text, position }) => {
  const [commentText, setCommentText] = useState(text);

  const onEmojiClick = (emojiObject: any) => {
    setCommentText((prevState: string) => prevState + emojiObject.emoji);
  };
  const handleCommentText = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleUpdateComment(commentText);
  };

  const disabled = loading || commentText.length === 0;

  return (
    <form styleName="form" onSubmit={handleSubmit}>
      <div styleName="form__emoji">
        <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={false} position={position} />
      </div>
      <textarea
        styleName="form__input"
        placeholder="Edit your comment..."
        onChange={handleCommentText}
        value={commentText}
      ></textarea>
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
