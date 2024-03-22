import { useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { Link, useLocation, useParams } from "react-router-dom";
import useProfileTabs from "../../../hooks/useProfileTabs";
import styles from "./ProfileNav.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

const ProfileNav = () => {
  const { userId } = useParams();
  const { selected } = useProfileTabs();
  const { theme } = useContext(ThemeContext);

  return (
    <nav styleName="navigation">
      <div styleName="navigation__content">
        <div styleName="navigation__links">
          <Link
            to={`/users/${userId}`}
            styleName={`navigation__link navigation__link--${theme} ${selected === "posts" ? "navigation__link--selected" : ""
              }`}
          >
            Posts
          </Link>
          <Link
            to={`/users/${userId}/likedPosts`}
            styleName={`navigation__link navigation__link--${theme} ${selected === "likedPosts" ? "navigation__link--selected" : ""
              }`}
          >
            Liked Posts
          </Link>
          <Link
            to={`/users/${userId}/friends`}
            styleName={`navigation__link navigation__link--${theme} ${selected === "friends" ? "navigation__link--selected" : ""
              }`}
          >
            Friends
          </Link>
          <Link
            to={`/users/${userId}/media`}
            styleName={`navigation__link navigation__link--${theme} ${selected === "media" ? "navigation__link--selected" : ""
              }`}
          >
            Media
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CSSModules(ProfileNav, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
