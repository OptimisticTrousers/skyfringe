import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import { FriendsLayout, FriendsCard } from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FriendsErrorLoading } from "../../components/skeletons";

const FriendRequests = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}/friends`
  );

  const incomingRequests = data?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "incoming"
  );
  const sentRequests = data?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "outgoing"
  );
  const rejectedIncoming = data?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "rejectedIncoming"
  );
  const outgoingRejected = data?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "outgoingRejected"
  );

  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Incoming Requests</h2>
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
        <h2 styleName="friends__title">Sent requests</h2>
        {incomingRequests ? (
          <ul styleName="friends__cards">
            {sentRequests.length > 0 ? (
              sentRequests?.map((sentRequest: any) => {
                return (
                  <li styleName="friends__card">
                    <FriendsCard friend={sentRequest.user} type="outgoing" />
                  </li>
                );
              })
            ) : (
              <li styleName="friends__message">No requests sent...</li>
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
        <h2 styleName="friends__title">Rejected Incoming Requests</h2>
        {rejectedIncoming ? (
          <ul styleName="friends__cards">
            {rejectedIncoming.length > 0 ? (
              rejectedIncoming?.map((sentRequest: any) => {
                return (
                  <li styleName="friends__card">
                    <FriendsCard friend={sentRequest.user} type="user" />
                  </li>
                );
              })
            ) : (
              <li styleName="friends__message">No incoming requests rejected...</li>
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
        <h2 styleName="friends__title">Outgoing Requests Rejected</h2>
        {outgoingRejected ? (
          <ul styleName="friends__cards">
            {outgoingRejected.length > 0 ? (
              outgoingRejected?.map((sentRequest: any) => {
                return (
                  <li styleName="friends__card">
                    <FriendsCard friend={sentRequest.user} type="user" />
                  </li>
                );
              })
            ) : (
              <li styleName="friends__message">No outgoing requests rejected...</li>
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
    </FriendsLayout>
  );
};

export default CSSModules(FriendRequests, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
