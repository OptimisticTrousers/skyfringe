import React from "react";
import CSSModules from "react-css-modules";
import ChatForm from "../ChatForm/ChatForm";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./ChatMain.module.css";

const ChatMain = () => {
  return (
    <div styleName="main">
      <ChatHeader />
      <div styleName="main__content">
        <ChatMessage isBlue={true}/>
        <ChatMessage isBlue={false}/>
        <ChatMessage isBlue={true}/>
        <ChatMessage isBlue={false}/>
        <ChatMessage isBlue={true}/>
        <ChatMessage isBlue={false}/>
        <ChatMessage isBlue={true}/>
        <ChatMessage isBlue={false}/>
        <ChatMessage isBlue={true}/>
        <ChatMessage isBlue={false}/>
        <ChatMessage isBlue={true}/>
        <ChatMessage isBlue={false}/>
        <ChatMessage isBlue={true}/>
      </div>
      <ChatForm />
    </div>
  );
};

export default CSSModules(ChatMain, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
