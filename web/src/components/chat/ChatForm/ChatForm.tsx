import { FormEvent, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillPicture, AiOutlineFileGif } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { ChatContext } from "../../../context/ChatContext";
import useChat from "../../../hooks/useChat";
import { socket } from "../../../utils/socket";
import styles from "./ChatForm.module.css";

const ChatForm = () => {
  const { selectedChat } = useContext(ChatContext);
  const { sendChatMessage } = useChat();
  const [text, setText] = useState("");
  const handleMessage = (event: any) => {
    setText(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    sendChatMessage(selectedChat._id, {content: text});
  };
  return (
    <form styleName="form" onSubmit={handleSubmit}>
      <FiPaperclip styleName="form__icon" />
      <AiFillPicture styleName="form__icon" />
      <AiOutlineFileGif styleName="form__icon" />
      <input
        styleName="form__input"
        placeholder="Write a message..."
        onChange={handleMessage}
        value={text}
      />
      <button styleName="form__button" type="submit">
        <RiSendPlaneFill styleName="form__icon form__icon--send" />
      </button>
    </form>
  );
};

export default CSSModules(ChatForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
