import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import { FriendsCard, FriendsLayout, UserList } from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FriendsErrorLoading } from "../../components/skeletons";

const FriendsHome = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}/friends`
  );

  const incomingRequests = data?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "incoming"
  );

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
            loading={loading}
            error={error}
          />
        )}
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Find new friends</h2>
        {data ? (
          <UserList userFriends={data} />
        ) : (
          <FriendsErrorLoading
            message="Unable to load users"
            loading={loading}
            error={error}
          />
        )}
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
