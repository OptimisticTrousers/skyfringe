import React from "react"
import CSSModules from "react-css-modules"
import ChatAside from "../components/ChatAside/ChatAside";
import ChatMain from "../components/ChatMain/ChatMain";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  return (
    <div styleName="chat">
      <ChatAside />
      <ChatMain />
    </div>
  )
}

export default CSSModules(Chat, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})