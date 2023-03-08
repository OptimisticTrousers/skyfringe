import CSSModules from "react-css-modules";
import { FriendsCard, FriendsLayout } from "../../components/friends";
import styles from "../../styles/Friends.module.css";

const FriendsHome = () => {
  return (
    <FriendsLayout>
      <li styleName="card">
        <FriendsCard />
      </li>
      <li styleName="card">
        <FriendsCard />
      </li>
      <li styleName="card">
        <FriendsCard />
      </li>
    </FriendsLayout>
  );
};

export default CSSModules(FriendsHome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
