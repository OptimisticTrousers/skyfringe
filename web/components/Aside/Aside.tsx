import React from "react";
import CSSModules from "react-css-modules";
import { AiFillHome } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiNewspaperFill } from "react-icons/ri";
import styles from "./Aside.module.css";

const Aside = () => {
  return (
    <aside styleName="home__aside">
      <div styleName="home__logo">
        <img src="optimistictrousers.jpg" styleName="home__image" />
        <h1>OptimisticTrousers</h1>
      </div>
      <div styleName="home__wrapper">
        {/* <div styleName="home__icon-container">
              <RiSearchLine />
            </div> */}
        <input styleName="home__input" placeholder="Explore kaloka..." />
      </div>
      <div styleName="home__links">
        <a styleName="home__link">
          <AiFillHome />
          <p styleName="home__text">Home</p>
        </a>
        <a styleName="home__link">
          <IoIosPeople />
          <p styleName="home__text">Community</p>
        </a>
        <a styleName="home__link">
          <FaShoppingBag />
          <p styleName="home__text">Marketplace</p>
        </a>
        <a styleName="home__link">
          <BsFillCalendarDateFill />
          <p styleName="home__text">Kaloka events</p>
        </a>
        <a styleName="home__link">
          <RiNewspaperFill />
          <p styleName="home__text">News feed</p>
        </a>
      </div>
      <div styleName="home__communities">
        <div styleName="home__header">
          <h2 styleName="home__subtitle">My community</h2>
          <p styleName="home__number">29</p>
        </div>
      </div>
    </aside>
  );
};

export default CSSModules(Aside, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
