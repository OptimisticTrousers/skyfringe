import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import useDeleteComment from "../../../hooks/useDeleteComment";
import useLikeComment from "../../../hooks/useLikeComment";
import useUpdateComment from "../../../hooks/useUpdateComment";
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
  const { updateComment, loading: updateLoading } = useUpdateComment();
  const { deleteComment, loading: deleteLoading } = useDeleteComment();
  const { likeComment, loading: likeLoading } = useLikeComment();

  const [isUserEditing, setIsUserEditing] = useState(false);

  const handleUserEditing = () => {
    setIsUserEditing((prevValue) => !prevValue);
  };

  const handleUpdateComment = (commentText: string) => {
    const updatedComment = updateComment(comment._id, comment.post, {
      content: commentText,
    });
    editLocalComment(comment._id, updatedComment);
  };

  const handleDeleteComment = () => {
    const commentId = comment._id;
    deleteComment(commentId, comment.post);
    deleteLocalComment(commentId);
  };

  return (
    <article styleName="comment">
      <div styleName="comment__container">
        <Avatar
          src={"/images/optimistictrousers.jpg"}
          alt={"user avatar"}
          size={"sm"}
        />
        <div styleName="comment__content">
          <div styleName="comment__details">
            <div styleName="comment__top">
              <Link styleName="comment__link" to="/">
                Aditaya Cah Tegal{" "}
              </Link>
              <span styleName="comment__gray">posted on January 24, 2022</span>
            </div>
            {isUserEditing ? (
              <p styleName="comment__text">
                People getting this type of rejection for AI images, or any
                images that contains ai generated content, but this is
                definitely not AI.
              </p>
            ) : (
              <EditCommentForm
                handleUpdateComment={handleUpdateComment}
                loading={updateLoading}
              />
            )}
          </div>
          <div styleName="comment__actions">
            <div styleName="comment__likes">
              <button styleName="comment__button comment__button--like">
                Like
              </button>
              <button styleName="comment__button comment__button--icon">
                <img
                  styleName="comment__icon comment__icon--heart"
                  src="/images/heart.png"
                />
                <span styleName="comment__count">0</span>
              </button>
            </div>
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
                data-testid={`delete-${comment._id}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CSSModules(Comment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
