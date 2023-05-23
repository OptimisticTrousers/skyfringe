import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./FriendsCard.module.css";
import {
  AcceptRequestBtn,
  Avatar,
  DeleteRequestBtn,
  SendRequestBtn,
  UnfriendRequestBtn,
} from "../../ui";
import CancelRequestBtn from "../../ui/CancelRequestBtn/CancelRequestBtn";
import { UserWithStringId } from "@backend/types";

interface Props {
  friend: UserWithStringId;
  type: string;
}

const FriendsCard: FC<Props> = ({ friend, type }) => {
  const friendId = friend?._id;
  return (
    <div styleName="card">
      <Link styleName="card__link card__link--image" to={`/users/${friendId}`}>
        <Avatar
          src={friend.photo && friend.photo.imageUrl}
          alt={friend.photo && friend.photo.altText}
          size="xxl"
        />
      </Link>
      <div styleName="card__content">
        <Link
          styleName="card__link card__link--name"
          to={`/users/${friend._id}`}
        >
          {friend.fullName}
        </Link>
        {type === "user" && <SendRequestBtn userId={friendId} />}
        {type === "friend" && <UnfriendRequestBtn userId={friendId} />}
        {type === "outgoing" && <CancelRequestBtn userId={friendId} />}
        {type === "incoming" && (
          <div styleName="card__container">
            <AcceptRequestBtn userId={friendId} />
            <DeleteRequestBtn userId={friendId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CSSModules(FriendsCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
