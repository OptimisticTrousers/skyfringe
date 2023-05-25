import { useContext, useEffect } from "react";
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
  const { fetchChat, data: chat,setData, loading }: any = useFetchChat();

  return (
    <ChatProvider>
      <div styleName="chat">
        <ChatAside fetchChat={fetchChat} />
        {!selectedChat && !chat && !loading && <Welcome />}
        {loading && <ChatLoading />}
        {chat && !loading && <ChatMain messages={chat?.messages} setData={setData}/>}
      </div>
    </ChatProvider>
  );
};

export default CSSModules(Chat, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
