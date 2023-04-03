import CSSModules from "react-css-modules";
import { FriendsCard, FriendsLayout } from "../../components/friends";
import styles from "../../assets/Friends.module.css";

const FriendsHome = () => {
  return (
    <FriendsLayout>
      <section styleName="friends">
        <h2 styleName="friends__title">Friend Requests</h2>
        <ul styleName="friends__cards">
          <li styleName="friends__card">
            {/* <FriendsCard /> */}
          </li>
          <li styleName="friends__card">
            {/* <FriendsCard /> */}
          </li>
          <li styleName="friends__card">
            {/* <FriendsCard /> */}
          </li>
        </ul>
      </section>
      <section styleName="friends">
        <h2 styleName="friends__title">Find new friends</h2>
        <ul styleName="friends__cards">
          <li styleName="friends__card">
            {/* <FriendsCard /> */}
          </li>
          <li styleName="friends__card">
            {/* <FriendsCard /> */}
          </li>
          <li styleName="friends__card">
            {/* <FriendsCard /> */}
          </li>
        </ul>
      </section>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});