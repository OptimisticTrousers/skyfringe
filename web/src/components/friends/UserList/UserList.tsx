import { FC, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
import FriendsCard from "../FriendsCard";
import { FriendsErrorLoading } from "../../skeletons";
import styles from "../../../assets/Friends.module.css";
import CSSModules from "react-css-modules";

interface Props {
  userFriends: any;
}

const UserList: FC<Props> = ({ userFriends }) => {
  const { user } = useContext(AuthContext);
  const {
    data: users,
    loading,
    error,
  }: any = useFetch(`${import.meta.env.VITE_API_DOMAIN}/users`);
  // Returns false if a user is either involved in the current user's friends array (request or friend), or is the current user themselves. Should only be called once users data is available
  const isRelatedUser = (userId: string) => {
    // Perform array operations to manipulate the userFriends object into a single depth array of user IDs
    const flatFriends = [
      userFriends?.friendRequests,
      userFriends?.friends,
    ].flat();
    const userFriendIds = flatFriends?.map((friend) => {
      if (friend?.user) {
        return friend?.user?._id;
      }
      return friend?._id;
    });
    userFriendIds?.push(user?._id);

    return userFriendIds?.some((id) => id === userId);
  };

  return (
    <div>
      <ul styleName="friends__cards">
        {users?.length > 0 ? (
          users?.map((user: any) => {
            if (!isRelatedUser(user?._id)) {
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
    </div>
  );
};

export default CSSModules(UserList, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
