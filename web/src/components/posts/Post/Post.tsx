import { FC, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineLike } from "react-icons/ai";
import { BiTime, BiCommentDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useCreateComment from "../../../hooks/useCreateComment";
import useLikePost from "../../../hooks/useLikePost";
import getTimeAgo from "../../../utils/getTimeAgo";
import userImageFallback from "../../../utils/userImageFallback";
import { Card } from "../../ui";
import CommentForm from "../CommentForm";
import Comments from "../Comments";
import MoreOptionsDropdown from "../MoreOptionsDropdown";
import { Post as PostInterface } from "../../../types";
import styles from "./Post.module.css";
import { useFetch } from "../../../hooks/useFetch";

interface Props {
  post: PostInterface;
}

const Post: FC<Props> = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { likePost, loading: postLoading } = useLikePost();
  const { createComment, loading: commentLoading } = useCreateComment();

  const {
    data: comments,
    loading,
    error,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/posts/${post._id}/comments`
  );

  const toggleForm = () => {
    setIsCommentFormOpen((prevValue) => !prevValue);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevValue) => !prevValue);
  };

  const toggleComments = () => {
    setIsCommentsOpen((prevValue) => !prevValue);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLike = () => {
    likePost(post._id);
  };

  return (
    <Card>
      <article>
        <div styleName="post__top">
          <div styleName="post__container">
            <Link to={`users/${post.author._id}`} styleName="post__link">
              <img
                src={post.author.photo?.imageUrl}
                styleName="post__avatar"
                onError={userImageFallback}
                alt={post.author.photo?.altText}
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
            {post?.author._id === user?._id && (
              <MoreOptionsDropdown
                post={post}
                closeDropdown={closeDropdown}
                toggleDropdown={toggleDropdown}
                isDropdownOpen={isDropdownOpen}
              />
            )}
            <BsBookmark styleName="post__icon post__icon--bookmark" />
          </div>
        </div>
        <div styleName="post__content">
          <p styleName="post__description">{post.content}</p>
          {post?.photo?.imageUrl && (
            <img
              src={post.photo?.imageUrl}
              styleName="post__image"
              alt={post.photo?.altText}
            />
          )}
          <div styleName="post__between">
            <button styleName="post__button post__button--likes">
              <img
                styleName="post__icon post__icon--heart"
                src="/images/heart.png"
              />
              <span styleName="post__count">
                {post?.likes.length === 1
                  ? "1 like"
                  : `${post?.likes.length} likes`}
              </span>
            </button>
            <button
              styleName="post__button post__button--comments"
              onClick={toggleComments}
            >
              {comments?.length === 1
                ? "1 comment"
                : `${comments?.length} comments`}
            </button>
          </div>
          <Comments
            isCommentsOpen={isCommentsOpen}
            comments={comments}
            loading={loading}
            error={error}
          />
        </div>
        <div styleName="post__buttons">
          <button
            styleName="post__button post__button--like"
            onClick={handleLike}
          >
            <AiOutlineLike styleName="post__icon post__icon--control" />
            <span styleName="post__name">
              {postLoading ? "Liking..." : "Like"}
            </span>
            {/* <span styleName="post__number">1</span> */}
          </button>
          <button
            styleName="post__button post__button--comment"
            onClick={toggleForm}
          >
            <BiCommentDetail styleName="post__icon post__icon--control" />
            <span styleName="post__name">Comment</span>
            {/* <span styleName="post__number">45</span> */}
          </button>
        </div>
        <CommentForm
          isCommentFormOpen={isCommentFormOpen}
          commentLoading={commentLoading}
          createComment={createComment}
          postId={post._id}
        />
      </article>
    </Card>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
