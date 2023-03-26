import { useContext } from "react";
import CSSModules from "react-css-modules";
import { ChatContext } from "../../../context/ChatContext";
import styles from "./ChatUser.module.css";

const ChatUser = () => {
  const { toggleAside } = useContext(ChatContext);

  return (
    <div styleName="user" onClick={toggleAside}>
      <div styleName="user__container">
        <img src="/images/optimistictrousers.jpg" styleName="user__avatar" />
        <div styleName="user__details">
          <div styleName="user__top">
            <h3 styleName="user__name">Floyd Miles</h3>
            <p styleName="user__time">15 min ago</p>
          </div>
          <div styleName="user__bottom">
            <p styleName="user__message">Voice message</p>
            <p styleName="user__number">6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(ChatUser, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
