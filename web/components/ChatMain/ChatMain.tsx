import React, { useContext } from "react";
import CSSModules from "react-css-modules";
import { ChatContext } from "../../context/ChatProvider";
import ChatForm from "../ChatForm/ChatForm";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./ChatMain.module.css";

const ChatMain = () => {
  const {isAsideOpen} = useContext(ChatContext);

  return (
    <div styleName={`main ${!isAsideOpen && "main--appear"}`}>
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
