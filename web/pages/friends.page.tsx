import CSSModules from "react-css-modules";
import {
  CurrentFriends,
  FriendRequestsReceived,
  FriendRequestsSent,
  FindFriends,
} from "../components/friends";
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
