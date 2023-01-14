import React, { useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillHome } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { RiNewspaperFill } from "react-icons/ri";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { RiSettingsFill } from "react-icons/ri";
import styles from "./Aside.module.css";

const Aside = () => {
  const [closeSidebar, setCloseSidebar] = useState(true);

  const toggle = () => {
    setCloseSidebar((prevToggleValue) => !prevToggleValue);
  };
  
  return (
    <>
      <div styleName="hamburger" onClick={toggle}>
        <div styleName="hamburger__line"></div>
        <div styleName="hamburger__line"></div>
        <div styleName="hamburger__line"></div>
      </div>
      <aside styleName={`aside ${closeSidebar && "aside--closed"}`}>
        <div styleName="aside__container">
          <img
            src="https://mmackz.github.io/admin-dashboard/images/logoipsum-logo-54.svg"
            alt="logo"
          />
          <AiFillCloseSquare
            styleName="aside__icon aside__icon--exit"
            onClick={toggle}
          />
        </div>
        <nav styleName="aside__nav">
          <ul styleName="aside__list">
            <li styleName="aside__item">
              <AiFillHome styleName="aside__icon" />
              <p styleName="aside__name">Home</p>
            </li>
            <li styleName="aside__item">
              <IoIosPeople styleName="aside__icon" />
              <p styleName="aside__name">Friends</p>
            </li>
            <li styleName="aside__item">
              <IoMdNotifications styleName="aside__icon" />
              <p styleName="aside__name">Notifications</p>
            </li>
            <li styleName="aside__item">
              <BsFillChatSquareDotsFill styleName="aside__icon" />
              <p styleName="aside__name">Chat</p>
            </li>
            <li styleName="aside__item">
              <RiNewspaperFill styleName="aside__icon" />
              <p styleName="aside__name">Saved Posts</p>
            </li>
            <li styleName="aside__item">
              <RiSettingsFill styleName="aside__icon" />
              <p styleName="aside__name">Settings</p>
            </li>
          </ul>
          <ul styleName="aside__list">
            <p styleName="aside__subtitle">Account</p>
            <li styleName="aside__item">
              <div styleName="aside__user">
                <img src="optimistictrousers.jpg" styleName="aside__avatar" />
                <div styleName="aside__details">
                  <h2 styleName="aside__name">Bob Jones</h2>
                  <p styleName="aside__friends">10 friends</p>
                </div>
              </div>
            </li>
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
