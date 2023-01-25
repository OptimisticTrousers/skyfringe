import React, { FC } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare } from "react-icons/ai";
import { FcGallery } from "react-icons/fc";
import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ChangePictureModal.module.css";
import {VscClose} from "react-icons/vsc";

interface Props {
  toggleModal: () => void;
}

const ChangePictureModal: FC<Props> = ({ toggleModal }) => {
  return (
    <ModalContainer title="Edit profile picture" toggleModal={toggleModal}>
      <div styleName="modal">
        <div styleName="modal__container">
          <img src="/images/optimistictrousers.jpg" styleName="modal__avatar" />
          <button styleName="modal__button modal__button--picture">
            <VscClose styleName="modal__icon modal__icon--exit" />
          </button>
        </div>
        <div styleName="modal__controls">
          <div styleName="modal__interactives">
            <label styleName="modal__label">
              <input type="file" styleName="modal__file" />
              <FcGallery styleName="modal__icon modal__icon--gallery" />
              Add picture
            </label>
          </div>
          <button styleName="modal__button modal__button--submit">Save</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CSSModules(ChangePictureModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
