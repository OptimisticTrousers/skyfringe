import { useContext } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { FriendsErrorLoading, SkeletonSuggestion } from "../../skeletons";
import { Avatar, Card, SendRequestBtn } from "../../ui";
import useFetch from "../../../hooks/useFetch";
import styles from "./Suggestions.module.css";
import SuggestionsErrorLoading from "../../skeletons/SuggestionsErrorLoading";

const Suggestions = () => {
  const { user } = useContext(AuthContext);
  const {
    data: users,
    loading,
    error,
  }: any = useFetch(`${import.meta.env.VITE_API_DOMAIN}/users`);
  // Returns false if a user is either involved in the current user's friends array (request or friend), or is the current user themselves. Should only be called once users data is available
  const isRelatedUser = (userId: string) => {
    // Perform array operations to manipulate the userFriends object into a single depth array of user IDs
    const flatFriends = [user?.friendRequests, user?.friends].flat();
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
    <Card>
      <div styleName="suggestions__text">
        <h2 styleName="suggestions__title">Suggestions For You</h2>
        <Link to="/friends" styleName="suggestions__link">
          Find new friends
        </Link>
      </div>
      {users ? (
        <ul styleName="suggestions__list">
          {users?.length > 0 ? (
            users.map((condensedUser: any) => {
              if (!isRelatedUser(condensedUser?._id)) {
                return (
                  <div styleName="suggestions__suggestion" key={condensedUser._id}>
                    <div styleName="suggestions__user">
                      <Link
                        styleName="suggestions__link suggestions__link--avatar"
                        to={`/users/${condensedUser._id}`}
                      >
                        <Avatar
                          src={condensedUser.photo.imageUrl}
                          alt={condensedUser.photo.altText}
                          size={"lg"}
                        />
                      </Link>
                      <Link
                        styleName="suggestions__link"
                        to={`/users/${condensedUser._id}`}
                      >
                        {condensedUser.fullName}
                      </Link>
                    </div>
                    <div styleName="suggestions__button">
                      <SendRequestBtn userId={condensedUser?._id} />
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <li styleName="suggestions__message">No users yet...</li>
          )}
        </ul>
      ) : (
        <SuggestionsErrorLoading
          message="Unable to load requests"
          loading={loading}
          error={error}
        />
      )}
    </Card>
  );
};

export default CSSModules(Suggestions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
