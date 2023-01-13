import React, { useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillHome } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiNewspaperFill } from "react-icons/ri";
import styles from "./Aside.module.css";
import { GrFormClose } from "react-icons/gr";
import { RiSettings3Line } from "react-icons/ri";
import {AiFillCloseSquare} from "react-icons/ai";

const Aside = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const toggle = () => {
    setToggleSidebar(prevToggleValue => !prevToggleValue);
  }
  return (
    <>
      <div styleName="hamburger" onClick={toggle}>
        <div styleName="hamburger__line"></div>
        <div styleName="hamburger__line"></div>
        <div styleName="hamburger__line"></div>
      </div>
      <aside styleName={`aside ${toggleSidebar && "aside--open"}`}>
        <div styleName="aside__container">
          <img
            src="https://mmackz.github.io/admin-dashboard/images/logoipsum-logo-54.svg"
            alt="logo"
          />
          <AiFillCloseSquare styleName="aside__icon aside__icon--exit" onClick={toggle}/>
        </div>
        <nav styleName="aside__nav">
          <ul styleName="aside__list">
            <li styleName="aside__item">
              <AiFillHome styleName="aside__icon" />
              <p styleName="aside__name">Home</p>
            </li>
            <li styleName="aside__item">
              <IoIosPeople styleName="aside__icon" />
              <p styleName="aside__name">Community</p>
            </li>
            <li styleName="aside__item">
              <FaShoppingBag styleName="aside__icon" />
              <p styleName="aside__name">Marketplace</p>
            </li>
            <li styleName="aside__item">
              <BsFillCalendarDateFill styleName="aside__icon" />
              <p styleName="aside__name">Kaloka events</p>
            </li>
            <li styleName="aside__item">
              <RiNewspaperFill styleName="aside__icon" />
              <p styleName="aside__name">News feed</p>
            </li>
          </ul>
          <ul styleName="aside__list">
            <li styleName="aside__item">
              <RiSettings3Line styleName="aside__icon" />
              <p styleName="aside__name">Settings</p>
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
