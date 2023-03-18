import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineLike } from "react-icons/ai";
import { BiTime, BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";
import Comments from "../Comments";
import { Card, MoreOptionsDropdown } from "../../ui";
import styles from "./Post.module.css";
import { Post as PostInterface } from "../../../types";
import { getTimeAgo } from "../../../utils";

interface Props {
  post: PostInterface;
}

const Post: FC<Props> = ({ post }) => {
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
            <h3 styleName="post__author">{post.author.fullName}</h3>
            <p styleName="post__date">
              <BiTime />
              <span styleName="post__time">{getTimeAgo(post.createdAt)}</span>
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
        <p styleName="post__description">{post.content}</p>
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
        </button>
      </div>
      <>{isCommentsOpen && <Comments />}</>
    </Card>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
