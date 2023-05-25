import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import useFetchChat from "../../../hooks/useFetchChat";
import ChatForm from "../ChatForm";
import ChatHeader from "../ChatHeader";
import ChatMessage from "../ChatMessage";
import styles from "./ChatMain.module.css";

interface Props {
  messages: any;
}

const ChatMain: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const { isAsideOpen, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  console.log(messages);

  return (
    <div styleName={`main ${!isAsideOpen && "main--appear"}`}>
      <ChatHeader />
      <div styleName="main__content">
        {messages?.map((message: any) => {
          if (message.author._id === user._id) {
            return <ChatMessage fromSelf={true} key={message._id} message={message}/>;
          }

          return <ChatMessage fromSelf={false} key={message._id} message={message}/>;
        })}
      </div>
      <ChatForm />
    </div>
  );
};

export default CSSModules(ChatMain, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
