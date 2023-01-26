import CSSModules from "react-css-modules";
import { useContext } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { ChatContext } from "../../../context/ChatProvider";
import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  const { isAsideOpen, toggleAside } = useContext(ChatContext);

  return (
    <header styleName="header">
      <div styleName="header__flex">
        {!isAsideOpen && (
          <MdOutlineArrowBackIosNew
            styleName="header__icon header__icon--back"
            onClick={toggleAside}
          />
        )}
        <img src="/images/optimistictrousers.jpg" styleName="header__avatar" />
        <div styleName="header__text">
          <h3 styleName="header__name">Ada Vishneva</h3>
          <p styleName="header__time">Last seen today at 17:38</p>
        </div>
      </div>
      <AiFillInfoCircle styleName="header__icon" />
    </header>
  );
};

export default CSSModules(ChatHeader, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
