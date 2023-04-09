import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import ModalContainer from "../ModalContainer";
import styles from "./DeletePostModal.module.css";
import useDeletePost from "../../../hooks/useDeletePost";
import { AuthContext } from "../../../context/AuthContext";

interface Props {
  toggleModal: () => void;
  postId: string;
}

const DeletePostModal: FC<Props> = ({ toggleModal, postId }) => {
  const { deletePost, loading } = useDeletePost();
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    deletePost(postId);
    toggleModal();
  };

  return (
    <ModalContainer title="Delete Post" toggleModal={toggleModal}>
      <form styleName="modal">
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
          <button
            styleName="modal__button modal__button--delete"
            onClick={handleDelete}
          >
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
