import React from "react";
import CSSModules from "react-css-modules";
import Card from "../components/Card/Card";
import CurrentFriends from "../components/CurrentFriends/CurrentFriends";
import FindFriends from "../components/FindFriends/FindFriends";
import FriendRequestsReceived from "../components/FriendRequestsReceived/FriendRequestsReceived";
import FriendRequestsSent from "../components/FriendRequestsSent/FriendRequestsSent";
import styles from "../styles/Friends.module.css";

const Friends = () => {
  return (
    <div styleName="friends">
      <CurrentFriends />
      <FriendRequestsReceived />
      <FriendRequestsSent />
      <FindFriends />
    </div>
  );
};

export default CSSModules(Friends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
