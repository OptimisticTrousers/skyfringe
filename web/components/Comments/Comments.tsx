import React from "react";
import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowUpFill, RiArrowDownFill } from "react-icons/ri";
import { TbArrowForward } from "react-icons/tb";
import Comment from "../Comment/Comment";
import styles from "./Comments.module.css";

const Comments = () => {
  return (
    <section styleName="comments">
      <div styleName="comments__form">
        <img
          src="/images/optimistictrousers.jpg"
          styleName="comments__avatar comments__avatar--comments"
        />
        <input styleName="comments__input" placeholder="What's on your mind?" />
      </div>
      <p styleName="comments__text">
        <span styleName="comments__all">
          All comments
          <IoIosArrowDown styleName="comments__icon comments__icon--arrow" />
        </span>
        {/* <span styleName="comments__filter">
          <span styleName="comments__gray">Sort by</span>
          Most popular
        </span> */}
      </p>
      <Comment />
    </section>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
