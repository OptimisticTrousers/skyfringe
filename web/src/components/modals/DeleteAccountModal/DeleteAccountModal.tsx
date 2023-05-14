import { FC, FormEvent, useContext } from "react";
import CSSModules from "react-css-modules";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import useDeleteAccount from "../../../hooks/useDeleteAccount";
import ModalContainer from "../ModalContainer";
import styles from "./DeleteAccountModal.module.css";

interface Props {
  toggleModal: () => void;
  userId: string;
}

const DeleteAccountModal: FC<Props> = ({ toggleModal, userId }) => {
  const { user } = useContext(AuthContext);
  const { deleteAccount, loading } = useDeleteAccount();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    deleteAccount(userId);
    toggleModal();
  };

  return (
    <ModalContainer title="Delete Account" toggleModal={toggleModal}>
      <form styleName="modal" onSubmit={handleSubmit}>
        <p styleName="modal__alert">
          Are you sure you want to delete your account, {user?.fullName}?
        </p>
        <p styleName="modal__message">
          Once your account has been deleted, it cannot be recovered. You cannot
          undo this action. All of your likes, posts, comments, and friend
          requests will be deleted.
        </p>
        <button styleName="modal__button">
          {loading ? "Deleting Account..." : "Delete Account"}
        </button>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(DeleteAccountModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
