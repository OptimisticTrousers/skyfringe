import { useState, useContext } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare, AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { IoIosPeople, IoMdNotifications } from "react-icons/io";
import { RiMoonClearFill, RiSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Avatar, Logo } from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import userImageFallback from "../../utils/userImageFallback";
import styles from "./Aside.module.css";

const Aside = () => {
  const [closeSidebar, setCloseSidebar] = useState(true);
  const { logout, loading } = useLogout();
  const { user } = useContext(AuthContext);

  const toggle = () => {
    setCloseSidebar((prevToggleValue) => !prevToggleValue);
  };

  const friendCountText = () => {
    const friendCount = user.friends.length;
    if (friendCount > 1) {
      return `${friendCount} friends`;
    } else if (friendCount === 1) {
      return "1 friend";
    }
    return "0 friends";
  };

  return (
    <>
      <button
        styleName="hamburger"
        onClick={toggle}
        aria-label="Open menu aside"
      >
        <div styleName="hamburger__line"></div>
        <div styleName="hamburger__line"></div>
        <div styleName="hamburger__line"></div>
      </button>
      <aside styleName={`aside ${closeSidebar && "aside--closed"}`}>
        <div styleName="aside__container">
          <Logo type="sm" />
          <button
            styleName="aside__button aside__button--exit"
            aria-label="Close menu aside"
            onClick={toggle}
          >
            <AiFillCloseSquare styleName="aside__icon aside__icon--exit" />
          </button>
        </div>
        <nav styleName="aside__nav">
          <ul styleName="aside__list">
            <Link to="/">
              <li styleName="aside__item">
                <AiFillHome styleName="aside__icon" />
                <p styleName="aside__name">Home</p>
              </li>
            </Link>
            <Link to="/friends">
              <li styleName="aside__item">
                <IoIosPeople styleName="aside__icon" />
                <p styleName="aside__name">Friends</p>
              </li>
            </Link>
            <Link to="/notifications">
              <li styleName="aside__item">
                <IoMdNotifications styleName="aside__icon" />
                <p styleName="aside__name">Notifications</p>
              </li>
            </Link>
            <Link to="/chat">
              <li styleName="aside__item">
                <BsFillChatSquareDotsFill styleName="aside__icon" />
                <p styleName="aside__name">Chat</p>
              </li>
            </Link>
            <li styleName="aside__item">
              <RiMoonClearFill styleName="aside__icon" />
              <p styleName="aside__name">Theme</p>
            </li>
            <Link to="/settings">
              <li styleName="aside__item">
                <RiSettingsFill styleName="aside__icon" />
                <p styleName="aside__name">Settings</p>
              </li>
            </Link>
            <li styleName="aside__item">
              <button
                styleName="aside__button aside__button--logout"
                onClick={logout}
              >
                <BiLogOut styleName="aside__icon" />
                <p styleName="aside__name">
                  {loading ? "Logging Out..." : "Log Out"}
                </p>
              </button>
            </li>
          </ul>
          <ul styleName="aside__list">
            <p styleName="aside__subtitle">Account</p>
            <Link to={`users/${user._id}`}>
              <li styleName="aside__item">
                <div styleName="aside__user">
                  <Avatar
                    src={user.photo && user.photo.imageUrl}
                    alt={"user avatar"}
                    size={"md"}
                  />
                  <div styleName="aside__details">
                    <h2 styleName="aside__name">{user.fullName}</h2>
                    <p styleName="aside__friends">{friendCountText()}</p>
                  </div>
                </div>
              </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default CSSModules(Aside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
