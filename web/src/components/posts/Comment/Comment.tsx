import { FC, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useDeleteComment from "../../../hooks/useDeleteComment";
import useLikeComment from "../../../hooks/useLikeComment";
import useUpdateComment from "../../../hooks/useUpdateComment";
import getTimeAgo from "../../../utils/getTimeAgo";
import { LikesModal } from "../../modals";
import { Avatar } from "../../ui";
import EditCommentForm from "../EditCommentForm";
import styles from "./Comment.module.css";

interface Props {
  comment: any;
  deleteLocalComment: any;
  editLocalComment: any;
}

const Comment: FC<Props> = ({
  comment,
  editLocalComment,
  deleteLocalComment,
}) => {
  const { user } = useContext(AuthContext);
  const { updateComment, loading: updateLoading } = useUpdateComment();
  const { deleteComment, loading: deleteLoading } = useDeleteComment();
  const { likeComment, loading: likeLoading } = useLikeComment();
  const [isLiked, setIsLiked] = useState(() => {
    if (comment.hasOwnProperty("likes")) {
      return comment.likes.find((like: any) => like._id === user._id) || false;
    }
    return false;
  });
  const [likesCount, setLikesCount] = useState(() => {
    if (comment.hasOwnProperty("likes")) {
      return comment.likes.length;
    }
    return 0;
  });

  const [localComment, setLocalComment] = useState(comment);

  const [isUserEditing, setIsUserEditing] = useState(false);

  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);

  const toggleModal = () => {
    setIsLikesModalOpen((prevValue) => !prevValue);
  };

  const handleUserEditing = () => {
    setIsUserEditing(true);
  };

  const handleUpdateComment = async (commentText: string) => {
    const updatedComment = await updateComment(
      comment._id,
      comment.post._id,
      {content: commentText}
    );
    editLocalComment(comment._id, updatedComment);
    setIsUserEditing(false);
  };

  const handleDeleteComment = async () => {
    const commentId = comment._id;
    await deleteComment(commentId, comment._id);
    deleteLocalComment(commentId);
  };

  const handleLike = async () => {
    await likeComment(comment._id, comment.post._id);
    if (isLiked) {
      // Unlike the post
      setIsLiked(false);
      setLocalComment((prevComment: any) => {
        return {
          ...prevComment,
          likes: prevComment.likes.filter((like: any) => like._id !== user._id),
        };
      });
      setLikesCount((likeCount: number) => likeCount - 1);
    } else {
      setIsLiked(true);
      setLocalComment((prevComment: any) => {
        return { ...prevComment, likes: [...prevComment.likes, user] };
      });
      setLikesCount((likeCount: number) => likeCount + 1);
    }
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

  return (
    <>
      <article styleName="comment">
        <div styleName="comment__container">
          <Avatar
            src={comment?.author?.photo?.imageUrl}
            alt={comment?.author?.photo?.altText}
            size={"sm"}
          />
          <div styleName="comment__content">
            <div styleName="comment__details">
              <div styleName="comment__top">
                <Link
                  styleName="comment__link"
                  to={`/users/${comment?.author?._id}`}
                >
                  {comment?.author?.fullName}{" "}
                </Link>
                <span styleName="comment__gray">
                  {getTimeAgo(comment?.createdAt)}
                </span>
              </div>
              {isUserEditing ? (
                <EditCommentForm
                  handleUpdateComment={handleUpdateComment}
                  loading={updateLoading}
                  text={comment?.content}
                />
              ) : (
                <p styleName="comment__text">{comment?.content}</p>
              )}
            </div>
            <div styleName="comment__actions">
              <div styleName="comment__likes">
                <button
                  styleName="comment__button comment__button--like"
                  onClick={handleLike}
                >
                  {likeButtonText()}
                </button>
                <button
                  styleName="comment__button comment__button--icon"
                  onClick={toggleModal}
                >
                  <img
                    styleName="comment__icon comment__icon--heart"
                    src="/images/heart.png"
                  />
                  <span styleName="comment__count">{likesCount}</span>
                </button>
              </div>
              {user?._id === comment?.author?._id && (
                <div styleName="comment__options">
                  <button
                    styleName="comment__button comment__button--edit"
                    onClick={handleUserEditing}
                  >
                    Edit
                  </button>
                  <button
                    styleName="comment__button comment__button--delete"
                    onClick={handleDeleteComment}
                    data-testid={`delete-${comment?._id}`}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
      {isLikesModalOpen && (
        <LikesModal toggleModal={toggleModal} data={localComment} />
      )}
    </>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
