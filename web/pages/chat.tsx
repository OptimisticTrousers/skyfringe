import React from "react";
import CSSModules from "react-css-modules";
import ChatAside from "../components/ChatAside/ChatAside";
import ChatMain from "../components/ChatMain/ChatMain";
import { ChatProvider } from "../context/ChatProvider";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  return (
    <ChatProvider>
      <div styleName="chat">
        <ChatAside />
        <ChatMain />
      </div>
    </ChatProvider>
  );
};

export default CSSModules(Chat, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
