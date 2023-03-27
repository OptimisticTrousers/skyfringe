import CSSModules from "react-css-modules";
import styles from "./AllFriends.module.css";
import { FriendsCard, FriendsLayout } from "../../components/friends";

const FriendsAll = () => {
  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Friends</h2>
        <ul styleName="friends__cards">
          <li styleName="friend__card">
            <FriendsCard />
          </li>
          <li styleName="friend__card">
            <FriendsCard />
          </li>
          <li styleName="friend__card">
            <FriendsCard />
          </li>
        </ul>
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsAll, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
