import CSSModules from "react-css-modules";
import { useState } from "react";
import { BiTime } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Comments from "../Comments";
import { Card, MoreOptionsDropdown } from "../../ui";
import styles from "./Post.module.css";

const Post = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => {
    setIsCommentsOpen((prevValue) => !prevValue);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevValue) => !prevValue);
  };

  return (
    <Card>
      <div styleName="post__top">
        <div styleName="post__container">
          <img src="/images/optimistictrousers.jpg" styleName="post__avatar" />
          <div styleName="post__details">
            <h3 styleName="post__author">Lucky Andreas</h3>
            <p styleName="post__date">
              <BiTime />
              <span styleName="post__time">12 minutes ago</span>
            </p>
          </div>
        </div>
        <div styleName="post__actions">
          <BsBookmark styleName="post__icon post__icon--bookmark" />
          <BsThreeDotsVertical
            onClick={toggleDropdown}
            styleName="post__icon post__icon--threedots"
          />
          {isDropdownOpen && <MoreOptionsDropdown />}
        </div>
      </div>
      <div styleName="post__content">
        <p styleName="post__description">
          What is the reason guys yesterday I uploaded same kind of content they
          approved it but when today I tried to upload they say we no longer
          accept this type of content
        </p>
        <img src="/images/optimistictrousers.jpg" styleName="post__image" />
      </div>
      <div styleName="post__buttons">
        <button styleName="post__button">
          <AiOutlineLike styleName="post__icon post__icon--control" />
          <span styleName="post__name">Like</span>
          <span styleName="post__number">1</span>
        </button>
        <button styleName="post__button" onClick={toggleComments}>
          <BiCommentDetail styleName="post__icon post__icon--control" />
          <span styleName="post__name">Comment</span>
          <span styleName="post__number">45</span>
        </button >
      </div>
      <>{isCommentsOpen && <Comments />}</>
    </Card>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
