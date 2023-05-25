import { useContext } from "react";
import CSSModules from "react-css-modules";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  const { user } = useContext(AuthContext);
  const { isAsideOpen, toggleAside, selectedChat } = useContext(ChatContext);

  const otherUser = selectedChat?.participants.find(
    (participant: any) => participant._id !== user._id
  );

  console.log(otherUser);

  return (
    <header styleName="header">
      <div styleName="header__flex">
        {!isAsideOpen && (
          <MdOutlineArrowBackIosNew
            styleName="header__icon header__icon--back"
            onClick={toggleAside}
          />
        )}
        <img
          src={otherUser?.photo?.imageUrl}
          alt={otherUser?.photo?.altText}
          styleName="header__avatar"
          onError={userImageFallback}
        />
        <div styleName="header__text">
          <h3 styleName="header__name">{otherUser.fullName}</h3>
          <p styleName="header__time">Last seen today at 17:38</p>
        </div>
      </div>
      <Link to={`/users/${otherUser._id}`}>
        <AiFillInfoCircle styleName="header__icon" />
      </Link>
    </header>
  );
};

export default CSSModules(ChatHeader, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
