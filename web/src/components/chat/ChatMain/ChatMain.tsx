import { useContext } from "react";
import CSSModules from "react-css-modules";
import { ChatContext } from "../../../context/ChatContext";
import ChatForm from "../ChatForm";
import ChatHeader from "../ChatHeader";
import ChatMessage from "../ChatMessage";
import styles from "./ChatMain.module.css";

const ChatMain = () => {
  const { isAsideOpen } = useContext(ChatContext);

  return (
    <div styleName={`main ${!isAsideOpen && "main--appear"}`}>
      <ChatHeader />
      <div styleName="main__content">
        <ChatMessage isBlue={true} />
        <ChatMessage isBlue={false} />
        <ChatMessage isBlue={true} />
        <ChatMessage isBlue={false} />
        <ChatMessage isBlue={true} />
        <ChatMessage isBlue={false} />
        <ChatMessage isBlue={true} />
        <ChatMessage isBlue={false} />
        <ChatMessage isBlue={true} />
        <ChatMessage isBlue={false} />
        <ChatMessage isBlue={true} />
        <ChatMessage isBlue={false} />
        <ChatMessage isBlue={true} />
      </div>
      <ChatForm />
    </div>
  );
};

export default CSSModules(ChatMain, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
