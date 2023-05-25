import { FC, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import ChatUser from "../ChatUser";
import styles from "./ChatAside.module.css";

interface Props {
  fetchChat: any;
}

const ChatAside: FC<Props> = ({fetchChat}) => {
  const { isAsideOpen} = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <aside styleName={`aside ${isAsideOpen && "aside--appear"}`}>
      <div styleName="aside__top">
        <div styleName="aside__details">
          <h2 styleName="aside__title">Messages</h2>
          <p styleName="aside__number">17</p>
        </div>
        <button styleName="aside__button">+ Create new chat</button>
      </div>
      <input styleName="aside__input" placeholder="Search by Keyword" />
      <div styleName="aside__users">
        {user.friends.map((friend: any) => {
          return <ChatUser key={friend._id} friend={friend} fetchChat={fetchChat}/>;
        })}
      </div>
    </aside>
  );
};

export default CSSModules(ChatAside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
