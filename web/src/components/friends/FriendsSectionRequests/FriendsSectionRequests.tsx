import { FriendRequestWithStringId as FriendRequest } from "@backend/types";
import { FC } from "react";
import CSSModules from "react-css-modules";
import FriendsCard from "../FriendsCard";
import styles from "../../../assets/Friends.module.css";

interface Props {
  title: string;
  emptyMessage: string;
  users: FriendRequest[];
  type: string;
}

const FriendsSectionRequests: FC<Props> = ({ title, users, emptyMessage, type }) => {
  return (
    <section styleName="friends">
      <h2 styleName="friends__title">{title}</h2>
      <ul styleName="friends__cards">
        {users.length > 0 ? (
          users.map((friend: FriendRequest) => {
            return (
              <li styleName="friend__card" key={friend.user._id}>
                <FriendsCard friend={friend.user} type={type} />
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

export default CSSModules(FriendsSectionRequests, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
