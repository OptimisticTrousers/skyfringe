import CSSModules from "react-css-modules";
import styles from "../../assets/Friends.module.css";
import { FriendsLayout, FriendsCard } from "../../components/friends";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { FriendsErrorLoading } from "../../components/skeletons";

const FriendRequests = () => {
  const { user } = useContext(AuthContext);

  const incomingRequests = user?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "incoming"
  );
  const sentRequests = user?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "outgoing"
  );
  const rejectedIncoming = user?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "rejectedIncoming"
  );
  const outgoingRejected = user?.friendRequests.filter(
    (friendRequest: any) => friendRequest.status === "outgoingRejected"
  );

  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Incoming Requests</h2>
        <ul styleName="friends__cards">
          {incomingRequests.length > 0 ? (
            incomingRequests?.map((incomingRequest: any) => {
              return (
                <li styleName="friends__card" key={incomingRequest?.user?._id}>
                  <FriendsCard friend={incomingRequest.user} type="incoming" />
                </li>
              );
            })
          ) : (
            <li styleName="friends__message">No requests yet...</li>
          )}
        </ul>
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Sent requests</h2>
        <ul styleName="friends__cards">
          {sentRequests.length > 0 ? (
            sentRequests?.map((sentRequest: any) => {
              return (
                <li styleName="friends__card" key={sentRequest?.user?._id}>
                  <FriendsCard friend={sentRequest.user} type="outgoing" />
                </li>
              );
            })
          ) : (
            <li styleName="friends__message">No requests sent...</li>
          )}
        </ul>
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Rejected Incoming Requests</h2>
        <ul styleName="friends__cards">
          {rejectedIncoming.length > 0 ? (
            rejectedIncoming?.map((sentRequest: any) => {
              return (
                <li styleName="friends__card" key={sentRequest?.user?._id}>
                  <FriendsCard friend={sentRequest.user} type="user" />
                </li>
              );
            })
          ) : (
            <li styleName="friends__message">
              No incoming requests rejected...
            </li>
          )}
        </ul>
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Outgoing Requests Rejected</h2>
        <ul styleName="friends__cards">
          {outgoingRejected.length > 0 ? (
            outgoingRejected?.map((sentRequest: any) => {
              return (
                <li styleName="friends__card" key={sentRequest?.user?._id}>
                  <FriendsCard friend={sentRequest.user} type="user" />
                </li>
              );
            })
          ) : (
            <li styleName="friends__message">
              No outgoing requests rejected...
            </li>
          )}
        </ul>
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendRequests, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
