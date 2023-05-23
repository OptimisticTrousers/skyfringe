import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { Avatar } from "../../ui";
import styles from "./ProfileFriend.module.css";

interface Props {
  friend: any;
}

const ProfileFriend: FC<Props> = ({ friend }) => {
  return (
    <li styleName="friend" key={friend._id}>
      <Link styleName="friend__link friend__link--avatar" to={`users/${friend._id}`}>
        <Avatar
          src={friend?.photo?.imageUrl}
          alt={friend?.photo?.altText}
          size={"md"}
        />
      </Link>
      <Link styleName="friend__link friend__link--name" to={`users/${friend._id}`}>{friend.fullName}</Link>
    </li>
  );
};

export default CSSModules(ProfileFriend, styles, {
  allowMultiple: true,
});
