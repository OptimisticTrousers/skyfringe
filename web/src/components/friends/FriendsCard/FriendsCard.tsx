import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { User } from "../../../types";
import styles from "./FriendsCard.module.css";
import {
  AcceptRequestBtn,
  Avatar,
  DeleteRequestBtn,
  SendRequestBtn,
  UnfriendRequestBtn,
} from "../../ui";
import CancelRequestBtn from "../../ui/CancelRequestBtn/CancelRequestBtn";

interface Props {
  friend: any;
  type: any;
}

const FriendsCard: FC<Props> = ({ friend, type }) => {
  return (
    <div styleName="card">
      <Link
        styleName="card__link card__link--image"
        to={`/users/${friend._id}`}
      >
        <Avatar
          src={friend?.photo?.imageUrl}
          alt={friend?.photo?.altText}
          size="xxl"
        />
      </Link>
      <div styleName="card__content">
        <Link
          styleName="card__link card__link--name"
          to={`/users/${friend._id}`}
        >
          {friend?.fullName}
        </Link>
        {type === "user" && <SendRequestBtn userId={friend?._id} />}
        {type === "friend" && <UnfriendRequestBtn userId={friend?._id} />}
        {type === "outgoing" && <CancelRequestBtn userId={friend?._id} />}
        {type === "incoming" && (
          <div styleName="card__container">
            <AcceptRequestBtn userId={friend?._id} />
            <DeleteRequestBtn userId={friend?._id} />
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
