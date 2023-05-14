import { UserWithStringId as User } from "@backend/types";
import { FC } from "react";
import CSSModules from "react-css-modules";
import FriendsCard from "../FriendsCard";
import styles from "../../../assets/Friends.module.css";

interface Props {
  title: string;
  emptyMessage: string;
  users: User[];
}

const FriendsSectionUsers: FC<Props> = ({ title, users, emptyMessage }) => {
  return (
    <section styleName="friends">
      <h2 styleName="friends__title">{title}</h2>
      <ul styleName="friends__cards">
        {users.length > 0 ? (
          users.map((friend: User) => {
            return (
              <li styleName="friend__card" key={friend._id}>
                <FriendsCard friend={friend} type="friend" />
              </li>
            );
          })
        ) : (
          <li styleName="friends__message">{emptyMessage}</li>
        )}
      </ul>
    </section>
  );
};

export default CSSModules(FriendsSectionUsers, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
