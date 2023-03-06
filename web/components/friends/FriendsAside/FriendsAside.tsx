import Link from "next/link";
import CSSModules from "react-css-modules";
import styles from "./FriendsAside.module.css";

const FriendsAside = () => {
  return (
    <aside styleName="aside">
      <h2 styleName="aside__title">Friends</h2>
      <nav styleName="aside__navigation">
        <ul styleName="aside__menu">
          <li styleName="aside__item">
            <Link href={"home"}>
              bob jones
            </Link>
          </li>
          <li styleName="aside__item">Friend Requests</li>
          <li styleName="aside__item">Suggested</li>
        </ul>
      </nav>
    </aside>
  );
};

export default CSSModules(FriendsAside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
