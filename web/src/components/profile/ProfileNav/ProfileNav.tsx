import { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { Link, useLocation, useParams } from "react-router-dom";
import useProfileTabs from "../../../hooks/useProfileTabs";
import styles from "./ProfileNav.module.css";

const ProfileNav = () => {
  const { userId } = useParams();
  const { selected } = useProfileTabs();

  return (
    <nav styleName="navigation">
      <div styleName="navigation__content">
        <div styleName="navigation__links">
          <Link
            to={`/users/${userId}`}
            styleName={`navigation__link ${
              selected === "posts" ? "navigation__link--selected" : ""
            }`}
          >
            Posts
          </Link>
          <Link
            to={`/users/${userId}/likedPosts`}
            styleName={`navigation__link ${
              selected === "likedPosts" ? "navigation__link--selected" : ""
            }`}
          >
            Liked Posts
          </Link>
          <Link
            to={`/users/${userId}/friends`}
            styleName={`navigation__link ${
              selected === "friends" ? "navigation__link--selected" : ""
            }`}
          >
            Friends
          </Link>
          <Link
            to={`/users/${userId}/media`}
            styleName={`navigation__link ${
              selected === "media" ? "navigation__link--selected" : ""
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
