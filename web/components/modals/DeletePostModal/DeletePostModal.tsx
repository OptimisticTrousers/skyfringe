import { FC } from "react";
import CSSModules from "react-css-modules";
import ModalContainer from "../ModalContainer";
import styles from "./DeletePostModal.module.css";

interface Props {
  toggleModal: () => void;
}

const DeletePostModal: FC<Props> = ({ toggleModal }) => {
  return (
    <ModalContainer title="Delete Account" toggleModal={toggleModal}>
      <form styleName="modal">
        <p styleName="modal__alert">
          Are you sure you want to delete your account?
        </p>
        <p styleName="modal__message">
          Once your account has been deleted, it cannot be recovered. You cannot
          undo this action.
        </p>
        <button styleName="modal__button">Delete Account</button>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(DeletePostModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
