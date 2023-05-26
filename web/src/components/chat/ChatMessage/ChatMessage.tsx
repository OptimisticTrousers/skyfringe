import { FC } from "react";
import CSSModules from "react-css-modules";
import getTimeAgo from "../../../utils/getTimeAgo";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./ChatMessage.module.css";

interface Props {
  fromSelf: boolean;
  message: any;
}

const ChatMessage: FC<Props> = ({ fromSelf, message }) => {
  return (
    <div styleName={`message ${fromSelf && "message--blue"}`}>
      <img
        src={message.author.photo?.imageUrl}
        alt={message.author.photo?.altText}
        styleName="message__avatar"
        onError={userImageFallback}
      />
      {message?.photo ? (
        <img
          src={message?.photo?.imageUrl}
          alt={message?.photo?.altText}
          styleName="message__image"
          onError={userImageFallback}
        />
      ) : (
        <p
          styleName={`message__content ${fromSelf && "message__content--blue"}`}
        >
          {message.content}
        </p>
      )}
      <span styleName="message__time">{getTimeAgo(message.createdAt)}</span>
    </div>
  );
};

export default CSSModules(ChatMessage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
