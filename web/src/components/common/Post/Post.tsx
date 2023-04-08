import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineLike } from "react-icons/ai";
import { BiTime, BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";
import Comments from "../Comments";
import { Card, MoreOptionsDropdown } from "../../ui";
import styles from "./Post.module.css";
import { Post as PostInterface } from "../../../types";
import getTimeAgo from "../../../utils/getTimeAgo";
import userImageFallback from "../../../utils/userImageFallback";
import { Link } from "react-router-dom";

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

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Card>
      <div styleName="post__top">
        <div styleName="post__container">
          <Link to={`users/${post.author._id}`} styleName="post__link">
            <img
              src={post.author.photo?.imageUrl}
              styleName="post__avatar"
              onError={userImageFallback}
            />
          </Link>

          <div styleName="post__details">
            <Link to={`users/${post.author._id}`}>
              <h3 styleName="post__author">{post.author.fullName}</h3>
            </Link>
            <h4 styleName="post__username">@{post.author.userName}</h4>
            <p styleName="post__date">
              <BiTime />
              <span styleName="post__time">{getTimeAgo(post.createdAt)}</span>
            </p>
          </div>
        </div>
        <div styleName="post__actions">
          <BsBookmark styleName="post__icon post__icon--bookmark" />
          <MoreOptionsDropdown
            postId={post._id}
            closeDropdown={closeDropdown}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
          />
        </div>
      </div>
      <div styleName="post__content">
        <p styleName="post__description">{post.content}</p>
        <img
          src={post.photo?.imageUrl}
          styleName={`post__image ${
            !post?.photo?.imageUrl && "post__image--disappear"
          }`}
        />
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
