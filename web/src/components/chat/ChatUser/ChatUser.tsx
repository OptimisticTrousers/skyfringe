import { FC, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { ChatContext } from "../../../context/ChatContext";
import useFetchChat from "../../../hooks/useFetchChat";
import styles from "./ChatUser.module.css";

interface Props {
  friend: any;
  fetchChat: any;
}

const ChatUser: FC<Props> = ({ friend, fetchChat }) => {
  const { toggleAside, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  const [selectedUser, setSelectedUser] = useState(false);

  const handleClick = async () => {
    toggleAside();
    setSelectedUser(true);
    const chat = await fetchChat(`${import.meta.env.VITE_API_DOMAIN}/chat`, {
      user: friend,
    });
    setSelectedChat(chat);
  };

  return (
    <div
      styleName={`user ${selectedUser ? "user--selected" : ""}`}
      onClick={handleClick}
    >
      <div styleName="user__container">
        <img
          src={friend?.photo?.imageUrl}
          alt={friend?.photo?.altText}
          styleName="user__avatar"
        />
        <div styleName="user__details">
          <div styleName="user__top">
            <h3 styleName="user__name">{friend.fullName}</h3>
            <p styleName="user__time">15 min ago</p>
          </div>
          <div styleName="user__bottom">
            <p styleName="user__message">Voice message</p>
            <p styleName="user__number">6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(ChatUser, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
