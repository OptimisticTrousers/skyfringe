import CSSModules from "react-css-modules";
import { ChatAside, ChatMain } from "../../components/chat";
import { ChatProvider } from "../../context/ChatContext";
import styles from "./Chat.module.css";

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