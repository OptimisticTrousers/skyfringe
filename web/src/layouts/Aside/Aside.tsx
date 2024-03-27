import { useState, useContext } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare, AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { IoIosPeople, IoMdNotifications } from "react-icons/io";
import { RiMoonClearFill, RiSettingsFill, RiSunFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Avatar, Logo, SearchBar } from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import userImageFallback from "../../utils/userImageFallback";
import styles from "./Aside.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const Aside = () => {
  const [closeSidebar, setCloseSidebar] = useState(true);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const { logout, loading } = useLogout();
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggle = () => {
    setCloseSidebar((prevToggleValue) => !prevToggleValue);
  };

  const friendCountText = () => {
    const friendCount = user.friends?.length;
    if (friendCount > 1) {
      return `${friendCount} friends`;
    } else if (friendCount === 1) {
      return "1 friend";
    }
    return "0 friends";
  };

  const toggleModal = () => {
    setIsNotificationsModalOpen((prevValue) => !prevValue);
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
      <aside styleName={`aside ${closeSidebar && "aside--closed"} aside--${theme}`}>
        <SearchBar />
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
              <li styleName={`aside__item aside__item--${theme}`}>
                <AiFillHome styleName="aside__icon" />
                <p styleName="aside__name">Home</p>
              </li>
            </Link>
            <Link to="/friends">
              <li styleName={`aside__item aside__item--${theme}`}>
                <IoIosPeople styleName="aside__icon" />
                <p styleName="aside__name">Friends</p>
              </li>
            </Link>
            <Link to="/notifications">
              <li styleName={`aside__item aside__item--${theme}`}>
                <IoMdNotifications styleName="aside__icon" />
                <p styleName="aside__name">Notifications</p>
              </li>
            </Link>
            <Link to="/chat">
              <li styleName={`aside__item aside__item--${theme}`}>
                <BsFillChatSquareDotsFill styleName="aside__icon" />
                <p styleName="aside__name">Chat</p>
              </li>
            </Link>
            <li styleName={`aside__item aside__item--${theme}`}>
              <button styleName="aside__button aside__button--flex" onClick={toggleTheme}>
                {theme === "light" && (
                  <RiMoonClearFill styleName="aside__icon" />
                )}
                {theme === "dark" && (
                  <RiSunFill styleName="aside__icon" />
                )}
                <p styleName="aside__name">Theme</p>
              </button>
            </li>
            <Link to="/settings">
              <li styleName={`aside__item aside__item--${theme}`}>
                <RiSettingsFill styleName="aside__icon" />
                <p styleName="aside__name">Settings</p>
              </li>
            </Link>
            <li styleName={`aside__item aside__item--${theme}`}>
              <button
                styleName="aside__button aside__button--flex"
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
              <li styleName={`aside__item aside__item--${theme}`}>
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
      {/* <NotificationsModal toggleModal={toggleModal}/> */}
    </>
  );
};

export default CSSModules(Aside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
