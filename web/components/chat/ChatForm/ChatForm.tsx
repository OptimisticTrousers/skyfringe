import CSSModules from "react-css-modules";
import { AiFillPicture, AiOutlineFileGif } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./ChatForm.module.css";

const ChatForm = () => {
  return (
    <form styleName="form">
      <FiPaperclip styleName="form__icon" />
      <AiFillPicture styleName="form__icon" />
      <AiOutlineFileGif styleName="form__icon" />
      <input styleName="form__input" placeholder="Write a message..." />
      <RiSendPlaneFill styleName="form__icon form__icon--send" />
    </form>
  );
};

export default CSSModules(ChatForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
