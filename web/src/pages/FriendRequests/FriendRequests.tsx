import CSSModules from "react-css-modules";
import styles from "../../styles/Friends.module.css";
import { FriendsCard, FriendsLayout } from "../../components/friends";

const FriendsRequests = () => {
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

export default CSSModules(FriendsRequests, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})