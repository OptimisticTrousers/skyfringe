import { useContext } from "react";
import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import { FriendsCard, FriendsLayout } from "../../components/friends";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../types";
import {
  FriendsErrorLoading,
  SkeletonFriendCard,
} from "../../components/skeletons";
import useFetch from "../../hooks/useFetch";

const FriendsAll = () => {
  const { user } = useContext(AuthContext);
  const {
    data: friends,
    loading,
    error,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}/friends`
  );

  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Friends</h2>
        {friends ? (
          <ul styleName="friends__cards">
            {friends.length > 0 ? (
              user.friends.map((friend: User) => {
                return (
                  <li styleName="friend__card" key={friend._id}>
                    <FriendsCard friend={friend} type="friend" />
                  </li>
                );
              })
            ) : (
              <li styleName="friends__message">No friends yet...</li>
            )}
          </ul>
        ) : (
          <FriendsErrorLoading
            message="Unable to load friends"
            loading={loading}
            error={error}
          />
        )}
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsAll, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
