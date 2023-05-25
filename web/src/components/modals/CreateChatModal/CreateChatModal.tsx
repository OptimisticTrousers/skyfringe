import { FC, useContext, useEffect, useRef, useState } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import userImageFallback from "../../../utils/userImageFallback";
import ModalContainer from "../ModalContainer";
import styles from "./CreateChatModal.module.css";

interface Props {
  toggleModal: () => void;
  fetchChat: any;
}

const CreateChatModal: FC<Props> = ({ toggleModal, fetchChat }) => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const inputRef = useRef<any>(null);
  const { setSelectedUser, selectedUser, setSelectedChat, selectedChat } =
    useContext(ChatContext);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const searchResults = user.friends.filter(
    (friend: any) =>
      friend.userName.toLowerCase().includes(query.toLowerCase()) ||
      friend.fullName.toLowerCase().includes(query.toLowerCase())
  );

  function handleInputChanged(e: any) {
    setQuery(e.target.value);
  }

  const handleUserClick = async (index: number, friend: any) => {
    toggleModal();
    setSelectedUser(index);
    const chat = await fetchChat(`${import.meta.env.VITE_API_DOMAIN}/chat`, {
      user: friend,
    });
    setSelectedChat(chat);
  };
  return (
    <ModalContainer title="Create Chat" toggleModal={toggleModal}>
      <div styleName="top-bar">
        <span styleName="to">To:</span>
        <input
          type="text"
          styleName="input"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            handleInputChanged(e);
          }}
          ref={inputRef}
        />
      </div>
      <div styleName="title">Suggested</div>
      {searchResults.map((friend: any, index: number) => {
        return (
          <div
            styleName="contact"
            onClick={() => handleUserClick(index, friend)}
          >
            <img
              styleName="contact__image"
              src={friend?.photo?.imageUrl}
              alt={friend?.photo?.altText}
              onError={userImageFallback}
            />
            <div styleName="contact__details">
              <h3 styleName="contact__username">{friend.userName}</h3>
              <p styleName="contact__fullname">{friend.fullName}</p>
            </div>
          </div>
        );
      })}
      {user.friends.length === 0 ? (
        <div className="message">
          You are not following anyone and no one is following you.
        </div>
      ) : null}
    </ModalContainer>
  );
};

export default CSSModules(CreateChatModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
