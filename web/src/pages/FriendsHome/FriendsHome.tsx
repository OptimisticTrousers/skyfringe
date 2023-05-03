import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import { FriendsCard, FriendsLayout } from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FriendsErrorLoading } from "../../components/skeletons";

const FriendsHome = () => {
  const { user } = useContext(AuthContext);
  const {
    data: firstResponse,
    loading: firstLoading,
    error: firstError,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}/friends`
  );

  const {
    data: secondResponse,
    loading: secondLoading,
    error: secondError,
  }: any = useFetch(`${import.meta.env.VITE_API_DOMAIN}/users`);

  const incomingRequests = firstResponse?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "incoming"
  );
  // Returns false if a user is either involved in the current user's friends array (request or friend), or is the current user themselves. Should only be called once users data is available
  const isRelatedUser = (userId: string) => {
    const userIds = [];

    // Perform array operations to manipulate the userFriends object into a single depth array of user IDs
    // Add user's id to array
    userIds.push(user?._id);

    // Add friend ids to array
    secondResponse.forEach((user: any) => {
      user.friends.forEach((friend: any) => {
        userIds.push(friend?._id);
      });
    });

    // Add friend request user ids to array
    secondResponse.forEach((user: any) => {
      user.friendRequests.forEach((friend: any) => {
        if (
          friend?.status !== "rejectedIncoming" &&
          friend?.status !== "outgoingRejected"
        ) {
          userIds.push(friend?.user?._id);
        }
      });
    });

    return userIds.some((id: any) => id === userId);
  };
  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Friend Requests</h2>
        {incomingRequests ? (
          <ul styleName="friends__cards">
            {incomingRequests.length > 0 ? (
              incomingRequests?.map((incomingRequest: any) => {
                return (
                  <li styleName="friends__card">
                    <FriendsCard
                      friend={incomingRequest.user}
                      type="incoming"
                    />
                  </li>
                );
              })
            ) : (
              <li styleName="friends__message">No requests yet...</li>
            )}
          </ul>
        ) : (
          <FriendsErrorLoading
            message="Unable to load requests"
            loading={firstLoading}
            error={firstError}
          />
        )}
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Find new friends</h2>
        <ul styleName="friends__cards">
          {secondResponse ? (
            <ul styleName="friends__cards">
              {secondResponse?.length > 0 ? (
                secondResponse?.map((user: any) => {
                  if (!isRelatedUser(user?._id)) {
                    // only render those unrelated users
                    return (
                      <li styleName="friends__card">
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
          ) : (
            <FriendsErrorLoading
              message="Unable to load requests"
              loading={secondLoading}
              error={secondError}
            />
          )}
        </ul>
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
