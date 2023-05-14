import { useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
import FriendsCard from "../FriendsCard";
import { FriendsErrorLoading } from "../../skeletons";
import styles from "../../../assets/Friends.module.css";
import CSSModules from "react-css-modules";
import { FetchUsersResponse, UserWithStringId as User } from "@backend/types";

const UserList = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users`
  );
  // Returns false if a user is either involved in the current user's friends array (request or friend), or is the current user themselves. Should only be called once users data is available
  const isRelatedUser = (userId: string) => {
    // Perform array operations to manipulate the userFriends object into a single depth array of user IDs
    const flatFriends = [user.friendRequests, user.friends].flat();
    const userFriendIds = flatFriends.map((friend) => {
      if (friend.user) {
        return friend.user._id;
      }
      return friend._id;
    });
    userFriendIds.push(user._id);

    return userFriendIds.some((id) => id === userId);
  };

  return (
    <section styleName="friends">
      <h2 styleName="friends__title">Find new friends</h2>
      <ul styleName="friends__cards">
        {data ? (
          data.map((user: User) => {
            if (!isRelatedUser(user._id)) {
              // only render those unrelated users
              return (
                <li styleName="friends__card" key={user._id}>
                  <FriendsCard friend={user} type="user" />
                </li>
              );
            }
            return null; // .map() expects a return value in every case, hence null here
          })
        ) : (
          <li styleName="friends__message">No users yet...</li>
        )}
      </ul>
      <FriendsErrorLoading
        message="Unable to load users"
        loading={loading}
        error={error}
      />
    </section>
  );
};

export default CSSModules(UserList, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
