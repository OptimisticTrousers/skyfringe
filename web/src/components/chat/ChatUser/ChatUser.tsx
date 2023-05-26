import { FC, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { ChatContext } from "../../../context/ChatContext";
import useFetchChat from "../../../hooks/useFetchChat";
import getTimeAgo from "../../../utils/getTimeAgo";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./ChatUser.module.css";

interface Props {
  friend: any;
  fetchChat: any;
  index: number;
  chat: any;
  setSelectedUser: any;
  selectedUser: any;
}

const ChatUser: FC<Props> = ({
  friend,
  fetchChat,
  index,
  chat,
  setSelectedUser,
  selectedUser,
}) => {
  const { toggleAside, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  const handleClick = async () => {
    toggleAside();
    setSelectedUser(index);
    const chat = await fetchChat(`${import.meta.env.VITE_API_DOMAIN}/chat`, {
      user: friend,
    });
    setSelectedChat(chat);
  };

  const newMessages = structuredClone(chat?.messages);
  const lastMessage = newMessages
    ?.reverse()
    .find((message: any) => message.hasOwnProperty("content"));

  return (
    <div
      styleName={`user ${selectedUser === index ? "user--selected" : ""}`}
      onClick={handleClick}
    >
      <div styleName="user__container">
        <img
          src={friend?.photo?.imageUrl}
          alt={friend?.photo?.altText}
          styleName="user__avatar"
          onError={userImageFallback}
        />
        <div styleName="user__details">
          <div styleName="user__top">
            <h3 styleName="user__name">{friend?.fullName}</h3>
            {/* Get the last message in the sorted "messages" array for the chat to get the most recent message */}
            <p styleName="user__time">
              {lastMessage?.createdAt ? getTimeAgo(lastMessage?.createdAt) : ""}
            </p>
          </div>
          <div styleName="user__bottom">
            <p styleName="user__message">
              {lastMessage?.content || "Start chatting with this user!"}
            </p>
            <p styleName="user__number">{chat?.messages.length || "0"}</p>
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
