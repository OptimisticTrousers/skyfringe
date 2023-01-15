import Link from "next/link";
import React from "react";
import CSSModules from "react-css-modules";
import ChatUser from "../ChatUser/ChatUser";
import styles from "./ChatAside.module.css";

const ChatAside = () => {
  return (
    <aside styleName="aside">
      <div styleName="aside__top">
        <div styleName="aside__details">
          <h2 styleName="aside__title">Messages</h2>
          <p styleName="aside__number">17</p>
        </div>
        <button styleName="aside__button">+ Create new chat</button>
      </div>
      <input styleName="aside__input" placeholder="Search by Keyword" />
      <div styleName="aside__users">
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
      </div>
    </aside>
  );
};

export default CSSModules(ChatAside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
