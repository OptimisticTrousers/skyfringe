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
import ChatImageUploadBtn from "../ChatImageUploadBtn";
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import { ToastContext } from "../../../context/ToastContext";
import { GrSend } from "react-icons/gr";
import GifOverlay from "../GifOverlay";
import StickerOverlay from "../StickerOverlay";
import { ThemeContext } from "../../../context/ThemeContext";

const ChatForm = ({ setData }: any) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { selectedChat } = useContext(ChatContext);
  const { sendChatMessage } = useChat();
  const [text, setText] = useState("");
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading } =
    useImageThumbnail();
  const { showToast } = useContext(ToastContext);
  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState<any>(null);
  const handleMessage = (event: any) => {
    setText(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", text);
    const newMessage = await sendChatMessage(selectedChat._id, formData);
    handleFeedback(newMessage);
  };

  const handleFeedback = (newMessage: any) => {
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
    setText("");
  };

  const onEmojiClick = (emojiObject: any) => {
    setText((prevState) => prevState + emojiObject.emoji);
  };

  const handlePhoto = async (event: any) => {
    handleFile(event.target.files[0]);
    const formData = new FormData();
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/jpg",
    ];
    const file = event.target.files[0];
    if (allowedTypes.includes(file.type)) {
      formData.append("image", event.target.files[0]);
      const newMessage = await sendChatMessage(selectedChat._id, formData);
      handleFeedback(newMessage);
    } else {
      showToast(
        "error",
        "Please enter a valid image type such as png, gif, jpg, jpeg, or webp"
      );
    }
  };

  const disabled = text.length === 0;
  return (
    <form
      styleName={`form form--${theme}`}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div styleName="form__interactives">
        <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={true} position={2} />
        <ChatImageUploadBtn
          handleChange={handlePhoto}
          imageValue={imageValue}
          setImageValue={setImageValue}
          setImageFile={setImageFile}
          removeThumbnail={removeThumbnail}
        />
        <StickerOverlay
          sendChatMessage={sendChatMessage}
          handleFeedback={handleFeedback}
        />
        <GifOverlay
          sendChatMessage={sendChatMessage}
          handleFeedback={handleFeedback}
        />
      </div>
      <input
        styleName="form__input"
        placeholder="Write a message..."
        maxLength={280}
        onChange={handleMessage}
        value={text}
      />
      <button
        styleName={`form__button ${disabled ? "form__button--disabled" : ""}`}
        type="submit"
        disabled={disabled}
      >
        <GrSend styleName="form__icon form__icon--send" />
      </button>
    </form>
  );
};

export default CSSModules(ChatForm, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
