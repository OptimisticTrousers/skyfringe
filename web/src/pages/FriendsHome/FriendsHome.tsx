import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import {
  FriendsCard,
  FriendsLayout,
  FriendsSectionRequests,
  UserList,
} from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FriendsErrorLoading } from "../../components/skeletons";

const FriendsHome = () => {
  const { user } = useContext(AuthContext);

  const incomingRequests = user?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "incoming"
  );

  return (
    <FriendsLayout>
      <FriendsSectionRequests
        title={"Friend Requests"}
        users={incomingRequests}
        emptyMessage={"No requests yet..."}
      />
      <UserList />
    </FriendsLayout>
  );
};

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
