import { FC, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import useFetch from "../../../hooks/useFetch";
import CreateChatModal from "../../modals/CreateChatModal";
import { Loading } from "../../ui";
import ChatUser from "../ChatUser";
import styles from "./ChatAside.module.css";

interface Props {
  fetchChat: any;
}

const ChatAside: FC<Props> = ({ fetchChat }) => {
  const { isAsideOpen } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { selectedChat, selectedUser, setSelectedUser } =
    useContext(ChatContext);

  const {
    data: chats,
    loading,
    error,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}/chats`
  );

  console.log(chats)

  const toggleModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  }

  const handleSelect = (index: number) => {
    setSelectedUser(index);
  };

  const messagesLength = chats?.reduce((prevValue: any, currentValue: any) => {
    return currentValue.messages.length + prevValue;
  }, 0);

  return (
    <>
    <aside styleName={`aside ${isAsideOpen && "aside--appear"}`}>
      <div styleName="aside__top">
        <div styleName="aside__details">
          <h2 styleName="aside__title">Messages</h2>
          <p styleName="aside__number">{messagesLength}</p>
        </div>
        <button styleName="aside__button" onClick={toggleModal}>+ Create new chat</button>
      </div>
      {/* <input styleName="aside__input" placeholder="Search by Keyword" /> */}
      <div styleName="aside__users">
        {chats?.length > 0  &&
          chats.map((chat: any, index: number) => {
            const otherUser = chat.participants.filter(
              (participant: any) => participant._id !== user._id
            )[0];
            return (
              <ChatUser
                key={otherUser?._id}
                friend={otherUser}
                fetchChat={fetchChat}
                setSelectedUser={handleSelect}
                chat={chat}
                index={index}
                selectedUser={selectedUser}
              />
            );
          })}
        {loading && (
          <div styleName="loading">
            <Loading />
          </div>
        )}
      </div>
    </aside>
    {isModalOpen && <CreateChatModal fetchChat={fetchChat} toggleModal={toggleModal}/>}
    </>
  );
};

export default CSSModules(ChatAside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
