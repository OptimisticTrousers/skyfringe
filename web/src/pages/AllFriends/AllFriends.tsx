import { useContext } from "react";
import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import { FriendsLayout, FriendsSectionUsers } from "../../components/friends";
import { AuthContext } from "../../context/AuthContext";

const FriendsAll = () => {
  const { user } = useContext(AuthContext);

  return (
    <FriendsLayout>
      <FriendsSectionUsers
        title={"Friends"}
        users={user.friends}
        emptyMessage={"No friends yet..."}
      />
    </FriendsLayout>
  );
};

export default CSSModules(FriendsAll, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
