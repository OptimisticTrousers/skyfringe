import { useState, useContext } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare, AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { IoIosPeople, IoMdNotifications } from "react-icons/io";
import { RiMoonClearFill, RiSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Logo } from "../../components/ui";
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
            <Link to="/profile">
              <li styleName="aside__item">
                <div styleName="aside__user">
                  <img
                    src={user?.photo?.imageUrl}
                    styleName="aside__avatar"
                    onError={userImageFallback}
                    alt={"user avatar"}
                  />
                  <div styleName="aside__details">
                    <h2 styleName="aside__name">{user?.fullName}</h2>
                    <p styleName="aside__friends">
                      {user?.friends.length === 1
                        ? "1 friend"
                        : `${user?.friends.length} friends`}
                    </p>
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
