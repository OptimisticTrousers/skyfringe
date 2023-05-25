import { useContext } from "react";
import CSSModules from "react-css-modules";
import {
  ChatAside,
  ChatLoading,
  ChatMain,
  Welcome,
} from "../../components/chat";
import { ErrorMessage } from "../../components/ui";
import { ChatContext, ChatProvider } from "../../context/ChatContext";
import { ToastContext } from "../../context/ToastContext";
import useFetchChat from "../../hooks/useFetchChat";
import styles from "./Chat.module.css";

const Chat = () => {
  const { selectedChat } = useContext(ChatContext);
  const { fetchChat, data: chat, loading }: any = useFetchChat();

  return (
    <ChatProvider>
      <div styleName="chat">
        <ChatAside fetchChat={fetchChat} />
        {!selectedChat && !chat && !loading && <Welcome />}
        {loading && <ChatLoading />}
        {chat && !loading && <ChatMain messages={chat?.messages} />}
      </div>
    </ChatProvider>
  );
};

export default CSSModules(Chat, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
