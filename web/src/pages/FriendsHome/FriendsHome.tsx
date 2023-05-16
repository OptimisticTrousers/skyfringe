import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import {
  FriendsLayout,
  FriendsSectionRequests,
  UserList,
} from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FriendRequestWithStringId as FriendRequest } from "@backend/types";

const FriendsHome = () => {
  const { user } = useContext(AuthContext);

  const incomingRequests = user.friendRequests.filter(
    (friendRequest: FriendRequest) => friendRequest.status === "incoming"
  );

  return (
    <FriendsLayout>
      <FriendsSectionRequests
        title={"Friend Requests"}
        users={incomingRequests}
        emptyMessage={"No requests yet..."}
        type="incoming"
      />
      <UserList />
    </FriendsLayout>
  );
};

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
