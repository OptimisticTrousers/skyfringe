import { FC, useContext, useEffect, useState } from "react";
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
import { Avatar, Card } from "../../ui";
import CommentForm from "../CommentForm";
import Comments from "../Comments";
import MoreOptionsDropdown from "../MoreOptionsDropdown";
import styles from "./Post.module.css";
import useFetch from "../../../hooks/useFetch";
import { LikesModal } from "../../modals";
import {
  CommentWithStringId as IComment,
  PostWithStringId as IPost,
  UserWithStringId as IUser,
} from "@backend/types";

interface Props {
  post: any;
  handleDeletePost: any;
  handleEditPost: any;
  setFeed: any;
}

const Post: FC<Props> = ({
  post,
  handleDeletePost,
  handleEditPost,
  setFeed,
}) => {
  const {
    setData: setComments,
    data: comments,
    loading,
    error,
  }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/posts/${post._id}/comments`
  );

  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  // const [isLiked, setIsLiked] = useState(() => {
  //   return post?.likes?.find((like: any) => like._id === user._id);
  // });
  // const [likesCount, setLikesCount] = useState(() => post?.likes?.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { likePost, loading: likeLoading } = useLikePost();
  const { createComment, loading: commentLoading } = useCreateComment();

  // const [localPost, setLocalPost] = useState(post);

  const handleCommentCreation = async (postId: string, formData: any) => {
    const createdComment = await createComment(postId, formData);
    setComments((prevComments: any) => {
      const comments = structuredClone(prevComments);
      comments.unshift(createdComment);
      return comments;
    });
  };

  const deleteLocalComment = (commentId: string) => {
    setComments((prevComments: any) => {
      return prevComments.filter(
        (prevComment: IComment) => prevComment._id !== commentId
      );
    });
  };

  const editLocalComment = (commentId: string, commentData: any) => {
    setComments((prevComments: any) => {
      return prevComments.map((prevComment: IComment) => {
        if (prevComment._id === commentId) {
          return commentData;
        }
        return prevComment;
      });
    });
  };

  const toggleModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

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

  const isLiked = post.likes.find((like: IUser) => like._id === user._id);

  const handleLike = async () => {
    const likedPost = await likePost(post._id);
    const postId = post._id;
    handleEditPost(post._id, likedPost);
  };

  const likeButtonText = () => {
    if (likeLoading && isLiked) {
      return "Unliking...";
    } else if (likeLoading && !isLiked) {
      return "Liking...";
    } else if (isLiked) {
      return "Liked";
    }
    return "Like";
  };

  const likeCountText = () => {
    const length = post.likes.length;
    if (length > 1) {
      return `${length} likes`;
    } else if (length === 1) {
      return "1 like";
    }
    return "0 likes";
  };

  const commentCountText = () => {
    const length = comments?.length;
    if (length > 1) {
      return `${length} comments`;
    } else if (length === 1) {
      return "1 comment";
    }
    return "0 comments";
  };

  const isCommentsDropdownDisabled = comments?.length === 0;

  return (
    <>
      <Card>
        <article>
          <div styleName="post__top">
            <div styleName="post__container">
              <Link to={`users/${post.author._id}`}>
                <Avatar
                  src={post.author.photo?.imageUrl}
                  alt={post.author.photo?.altText}
                  size={"lg"}
                />
              </Link>
              <div styleName="post__details">
                <Link to={`users/${post.author._id}`}>
                  <h3 styleName="post__author">{post.author.fullName}</h3>
                </Link>
                <h4 styleName="post__username">@{post.author.userName}</h4>
                <p styleName="post__date">
                  <BiTime />
                  <span styleName="post__time">
                    {getTimeAgo(post.createdAt)}
                  </span>
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
                  handleEditPost={handleEditPost}
                  handleDeletePost={handleDeletePost}
                />
              )}
            </div>
          </div>
          <div styleName="post__content">
            <p styleName="post__description">{post.content}</p>
            {post?.photo?.imageUrl && (
              <img
                src={`${post.photo?.imageUrl}?${Date.now()}`}
                styleName="post__image"
                alt={post.photo?.altText}
              />
            )}
            <div styleName="post__between">
              <button
                styleName="post__button post__button--likes"
                onClick={toggleModal}
              >
                <img
                  styleName="post__icon post__icon--heart"
                  src="/images/heart.png"
                />
                <span styleName="post__count">{likeCountText()}</span>
              </button>
              <button
                styleName={`post__button post__button--comments ${
                  comments?.length === 0 && "post__button--disabled"
                }`}
                onClick={toggleComments}
                disabled={isCommentsDropdownDisabled}
              >
                {commentCountText()}
              </button>
            </div>
            <Comments
              isCommentsOpen={isCommentsOpen}
              comments={comments}
              loading={loading}
              error={error}
              deleteLocalComment={deleteLocalComment}
              editLocalComment={editLocalComment}
            />
          </div>
          <div styleName="post__buttons">
            <button
              styleName="post__button post__button--like"
              onClick={handleLike}
              disabled={likeLoading}
            >
              <AiOutlineLike styleName="post__icon post__icon--control" />
              <span styleName="post__name">{likeButtonText()}</span>
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
            createComment={handleCommentCreation}
            postId={post._id}
          />
        </article>
      </Card>
      {isModalOpen && <LikesModal toggleModal={toggleModal} data={post} />}
    </>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
