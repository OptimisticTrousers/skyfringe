import CSSModules from "react-css-modules";
import { FriendsCard, FriendsLayout } from "../../components/friends";
import styles from "../../assets/Friends.module.css";

const FriendRequests = () => {
  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Incoming Requests</h2>
        <ul styleName="friends__cards">
          <li styleName="friends__card">
            <FriendsCard />
          </li>
          <li styleName="friends__card">
            <FriendsCard />
          </li>
          <li styleName="friends__card">
            <FriendsCard />
          </li>
        </ul>
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Sent requests</h2>
        <ul styleName="friends__cards">
          <li styleName="friends__card">
            <FriendsCard />
          </li>
          <li styleName="friends__card">
            <FriendsCard />
          </li>
          <li styleName="friends__card">
            <FriendsCard />
          </li>
        </ul>
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendRequests, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})