import React from "react";
import CSSModules from "react-css-modules";
import styles from "./ChatHeader.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import {AiFillInfoCircle} from "react-icons/ai";

const ChatHeader = () => {
  return (
    <header styleName="header">
      <div styleName="header__flex">
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
