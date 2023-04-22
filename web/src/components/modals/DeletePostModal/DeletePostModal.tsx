import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import useDeletePost from "../../../hooks/useDeletePost";
import ModalContainer from "../ModalContainer";
import styles from "./DeletePostModal.module.css";

interface Props {
  toggleModal: () => void;
  postId: string;
  handleDeletePost: any;
}

const DeletePostModal: FC<Props> = ({
  toggleModal,
  postId,
  handleDeletePost,
}) => {
  const { deletePost, loading } = useDeletePost();
  const { user } = useContext(AuthContext);

  const handleDelete = (event: any) => {
    event.preventDefault();
    deletePost(postId);
    handleDeletePost(postId);
    toggleModal();
  };

  return (
    <ModalContainer title="Delete Post" toggleModal={toggleModal}>
      <form styleName="modal" onSubmit={handleDelete}>
        <p styleName="modal__alert">
          Are you sure you want to delete your post, {user?.fullName}?
        </p>
        <p styleName="modal__message">You can't undo this action.</p>
        <div styleName="modal__buttons">
          <button
            styleName="modal__button modal__button--cancel"
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button styleName="modal__button modal__button--delete" type="submit">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(DeletePostModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
