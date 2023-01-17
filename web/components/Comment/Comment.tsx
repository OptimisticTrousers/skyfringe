import React from "react";
import CSSModules from "react-css-modules";
import { RiArrowUpFill, RiArrowDownFill } from "react-icons/ri";
import { TbArrowForward } from "react-icons/tb";
import styles from "./Comment.module.css";

const Comment = () => {
  return (
    <div styleName="comment">
      <div styleName="comment__container">
        <img
          src="/images/optimistictrousers.jpg"
          styleName="comment__avatar comment__avatar--comment"
        />
        <div styleName="comment__details">
          Aditaya Cah Tegal:{" "}
          <span styleName="comment__gray">
            People getting this type of rejection for AI images, or any images
            that contains ai generated content, but this is definitely not AI.
          </span>
          <div styleName="comment__actions">
            {/* <div styleName="comment__reply">
              <TbArrowForward styleName="comment__icon comment__icon--comment" />
              <span styleName="comment__name">Reply comment</span>
              <span styleName="comment__number">12</span>
            </div> */}
            <div styleName="comment__votes">
              <div styleName="comment__vote">
                <RiArrowUpFill styleName="comment__icon comment__icon--vote" />{" "}
                Upvote
              </div>
              |
              <div styleName="comment__vote">
                <RiArrowDownFill styleName="comment__icon comment__icon--vote" />{" "}
                Downvote
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
