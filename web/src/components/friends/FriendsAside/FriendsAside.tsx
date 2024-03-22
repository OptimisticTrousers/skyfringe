import CSSModules from "react-css-modules";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { Link } from "react-router-dom";
import styles from "./FriendsAside.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const FriendsAside = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <aside styleName={`aside aside--${theme}`}>
      <h2 styleName="aside__title">Friends</h2>
      <nav styleName="aside__navigation">
        <ul styleName="aside__menu">
          <li styleName="aside__item">
            <Link styleName={`aside__link aside__link--${theme}`} to="/friends">
              <GiThreeFriends styleName={`aside__icon aside__icon--${theme}`} />
              <span styleName="aside__text">Suggested</span>
            </Link>
          </li>
          <li styleName="aside__item">
            <Link styleName={`aside__link aside__link--${theme}`} to="/friends/requests">
              <FaPaperPlane styleName={`aside__icon aside__icon--${theme}`} />
              <span styleName="aside__text">Friend requests</span>
            </Link>
          </li>
          <li styleName="aside__item">
            <Link styleName={`aside__link aside__link--green aside__link--${theme}`} to="/friends/all">
              <FaUserFriends styleName={`aside__icon aside__icon--${theme}`} />
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
