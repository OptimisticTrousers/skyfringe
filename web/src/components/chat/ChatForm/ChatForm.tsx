import { FormEvent, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillPicture, AiOutlineFileGif } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { ChatContext } from "../../../context/ChatContext";
import useChat from "../../../hooks/useChat";
import { socket } from "../../../utils/socket";
import styles from "./ChatForm.module.css";
import EmojiPickerBtn from "../../ui/EmojiPickerBtn/EmojiPickerBtn";
import { AuthContext } from "../../../context/AuthContext";

const ChatForm = ({ setData }: any) => {
  const { user } = useContext(AuthContext);
  const { selectedChat } = useContext(ChatContext);
  const { sendChatMessage } = useChat();
  const [text, setText] = useState("");
  const handleMessage = (event: any) => {
    setText(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newMessage = await sendChatMessage(selectedChat._id, {
      content: text,
    });
    socket.emit("send-msg", {
      to: selectedChat.participants.filter(
        (participant: any) => participant._id !== user._id
      )[0]._id,
      from: user._id,
      message: newMessage,
    });
    setData((prevChat: any) => {
      const clonedChat = structuredClone(prevChat);
      clonedChat.messages.push(newMessage);
      return clonedChat;
    });
    setText("")
  };
  const onEmojiClick = (emojiObject: any) => {
    setText((prevState) => prevState + emojiObject.emoji);
  };

  const disabled = text.length === 0;
  return (
    <form styleName="form" onSubmit={handleSubmit}>
      <div styleName="form__interactives">
        <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={true} />
        <AiFillPicture styleName="form__icon" />
        <AiOutlineFileGif styleName="form__icon" />
      </div>
      <input
        styleName="form__input"
        placeholder="Write a message..."
        onChange={handleMessage}
        value={text}
      />
      <button styleName={`form__button ${disabled ? "form__button--disabled" : ""}`} type="submit" disabled={disabled}>
        <RiSendPlaneFill styleName="form__icon form__icon--send" />
      </button>
    </form>
  );
};

export default CSSModules(ChatForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
