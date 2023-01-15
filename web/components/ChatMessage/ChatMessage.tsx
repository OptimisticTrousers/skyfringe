import React, { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./ChatMessage.module.css";

interface Props {
  isBlue: boolean;
}

const ChatMessage: FC<Props> = ({isBlue}) => {
  return (
    <div styleName={`message ${isBlue && "message--blue"}`}>
      <img src="/images/optimistictrousers.jpg" styleName="message__avatar" />
      <p styleName={`message__content ${isBlue && "message__content--blue"}`}>I just read it, only read a few pages.</p>
      <span styleName="message__time">20:48</span>
    </div>
  );
};

export default CSSModules(ChatMessage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
