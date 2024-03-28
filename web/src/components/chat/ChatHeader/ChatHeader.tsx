import { useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { socket } from "../../../utils/socket";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./ChatHeader.module.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { Avatar } from "../../ui";

const ChatHeader = () => {
  const { user } = useContext(AuthContext);
  const { isAsideOpen, toggleAside, selectedChat } = useContext(ChatContext);
  const [lastConnected, setLastConnected] = useState()
  const { theme } = useContext(ThemeContext);

  const otherUser = selectedChat?.participants.find(
    (participant: any) => participant._id !== user._id
  );

  useEffect(() => {
    socket.on("last-connected", (date) => {
      setLastConnected(date);
    })
  }, [])

  return (
    <header styleName="header">
      <div styleName="header__flex">
        {!isAsideOpen && (
          <MdOutlineArrowBackIosNew
            styleName="header__icon header__icon--back"
            onClick={toggleAside}
          />
        )}
        <Avatar
          size={"chat"}
          src={otherUser?.photo?.imageUrl}
          alt={otherUser?.photo?.altText} />
        <div styleName="header__text">
          <h3 styleName={`header__name header__name--${theme}`}>{otherUser?.fullName}</h3>
          {/* <p styleName="header__time">Last seen today at 17:38</p> */}
        </div>
      </div>
      <Link styleName={`header__link header__link--${theme}`} to={`/users/${otherUser?._id}`}>
        <AiFillInfoCircle styleName="header__icon" />
      </Link>
    </header>
  );
};

export default CSSModules(ChatHeader, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
