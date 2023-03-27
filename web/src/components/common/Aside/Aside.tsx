import { useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillHome, AiFillCloseSquare } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { IoIosPeople, IoMdNotifications } from "react-icons/io";
import { RiSettingsFill } from "react-icons/ri";
import styles from "./Aside.module.css";
import Logo from "../../ui/Logo/Logo";
import { Link } from "react-router-dom";

const Aside = () => {
  const [closeSidebar, setCloseSidebar] = useState(true);

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
            styleName="aside__button"
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
            <Link to="/settings">
              <li styleName="aside__item">
                <RiSettingsFill styleName="aside__icon" />
                <p styleName="aside__name">Settings</p>
              </li>
            </Link>
            <Link to="/log-out">
              <li styleName="aside__item">
                <BiLogOut styleName="aside__icon" />
                <p styleName="aside__name">Log Out</p>
              </li>
            </Link>
          </ul>
          <ul styleName="aside__list">
            <p styleName="aside__subtitle">Account</p>
            <Link to="/profile">
              <li styleName="aside__item">
                <div styleName="aside__user">
                  <img
                    src="/images/optimistictrousers.jpg"
                    styleName="aside__avatar"
                  />
                  <div styleName="aside__details">
                    <h2 styleName="aside__name">Bob Jones</h2>
                    <p styleName="aside__friends">10 friends</p>
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
