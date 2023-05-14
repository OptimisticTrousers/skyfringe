import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import {
  FriendsLayout,
  FriendsSectionRequests,
} from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FriendRequestWithStringId as FriendRequest } from "@backend/types";

const FriendRequests = () => {
  const { user } = useContext(AuthContext);

  const incomingRequests = user.friendRequests.filter(
    (friendRequest: FriendRequest) => friendRequest.status === "incoming"
  );
  const sentRequests = user.friendRequests.filter(
    (friendRequest: FriendRequest) => friendRequest.status === "outgoing"
  );
  const rejectedIncoming = user.friendRequests.filter(
    (friendRequest: FriendRequest) =>
      friendRequest.status === "rejectedIncoming"
  );
  const outgoingRejected = user.friendRequests.filter(
    (friendRequest: FriendRequest) =>
      friendRequest.status === "outgoingRejected"
  );

  return (
    <FriendsLayout>
      <FriendsSectionRequests
        title={"Incoming Requests"}
        users={incomingRequests}
        emptyMessage={"No requests yet..."}
      />
      <FriendsSectionRequests
        title={"Sent Requests"}
        users={sentRequests}
        emptyMessage={"No requests yet..."}
      />
      <FriendsSectionRequests
        title={"Rejected Incoming Requests"}
        users={rejectedIncoming}
        emptyMessage={"No incoming rejected requests yet..."}
      />
      <FriendsSectionRequests
        title={"Outgoing Requests Rejected"}
        users={outgoingRejected}
        emptyMessage={"No outgoing requests rejected yet..."}
      />
    </FriendsLayout>
  );
};

export default CSSModules(FriendRequests, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
