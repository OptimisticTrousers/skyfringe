import { FC, useContext, useEffect, useRef } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import useFetchChat from "../../../hooks/useFetchChat";
import ChatForm from "../ChatForm";
import ChatHeader from "../ChatHeader";
import ChatMessage from "../ChatMessage";
import styles from "./ChatMain.module.css";
import { socket } from "../../../utils/socket";

interface Props {
  messages: any;
  setData: any;
}

const ChatMain: FC<Props> = ({ messages, setData }) => {
  const { user } = useContext(AuthContext);
  const { isAsideOpen, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  const scrollRef = useRef<any>();

  useEffect(() => {
    socket.emit("add-user", user._id);
  }, []);

  useEffect(() => {
    socket.on("msg-receive", (msg) => {
      console.log(msg);
      setData((prevChat: any) => {
        const clonedChat = structuredClone(prevChat);
        clonedChat.messages.push(msg);
        return clonedChat;
      });
    });
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div styleName={`main ${!isAsideOpen && "main--appear"}`}>
      <ChatHeader />
      <div styleName="main__content">
        {messages?.map((message: any) => {
          console.log(message);
          if (message?.author?._id === user._id) {
            return (
              <div key={message._id} ref={scrollRef}>
                <ChatMessage
                  fromSelf={true}
                  key={message._id}
                  message={message}
                />
              </div>
            );
          }

          return (
            <ChatMessage fromSelf={false} key={message._id} message={message} />
          );
        })}
        {messages?.length === 0 && (
          <p styleName="main__message">No messages yet...</p>
        )}
      </div>
      <ChatForm setData={setData} />
    </div>
  );
};

export default CSSModules(ChatMain, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
