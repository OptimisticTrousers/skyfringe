import Link from "next/link";
import CSSModules from "react-css-modules";
import styles from "./FriendsAside.module.css";
import {GiThreeFriends} from "react-icons/gi";
import {FaPaperPlane} from "react-icons/fa";
import {FaUserFriends} from "react-icons/fa";

const FriendsAside = () => {
  return (
    <aside styleName="aside">
      <h2 styleName="aside__title">Friends</h2>
      <nav styleName="aside__navigation">
        <ul styleName="aside__menu">
          <li styleName="aside__item">
            <Link styleName="aside__link" href={"home"}>
              <GiThreeFriends styleName="aside__icon" />
              <span styleName="aside__text">Suggested</span>
            </Link>
          </li>
          <li styleName="aside__item">
            <Link styleName="aside__link" href="bob">
              <FaPaperPlane styleName="aside__icon" />
              <span styleName="aside__text">Friend requests</span>
            </Link>
          </li>
          <li styleName="aside__item">
            <Link styleName="aside__link aside__link--green" href="tony">
              <FaUserFriends styleName="aside__icon" />
              <span styleName="aside__text">All friends</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default CSSModules(FriendsAside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
