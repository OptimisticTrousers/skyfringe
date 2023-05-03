import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { User } from "../../../types";
import styles from "./FriendsCard.module.css";
import { Avatar } from "../../ui";

interface Props {
  friend: any;
  type: any;
}

const FriendsCard: FC<Props> = ({ friend, type }) => {
  return (
    <div styleName="card">
      <Link styleName="card__link card__link--image" to="/bob">
        <Avatar
          src={friend?.photo?.imageUrl}
          alt={friend?.photo?.altText}
          size="xxl"
        />
      </Link>
      <div styleName="card__content">
        <Link styleName="card__link card__link--name" to="/bob">
          {friend.fullName}
        </Link>
        <button styleName="card__button">Unfriend</button>
      </div>
    </div>
  );
};

export default CSSModules(FriendsCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
