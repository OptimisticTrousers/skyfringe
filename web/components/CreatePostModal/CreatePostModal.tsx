import React, { FC } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare } from "react-icons/ai";
import styles from "./CreatePostModal.module.css";
import { FcGallery } from "react-icons/fc";
import useDisableScroll from "../../hooks/useDisableScroll";

interface Props {
  toggleModal: () => void;
}

const CreatePostModal: FC<Props> = ({toggleModal}) => {

  // Call hook for disabling scrolling
  useDisableScroll();

  return (
    <div styleName="modal">
      <form styleName="modal__form">
        <button styleName="modal__button modal__button--exit" type="button" onClick={toggleModal}>
          <AiFillCloseSquare styleName="modal__icon" />
        </button>
        <div styleName="modal__title-bar">
          <h2 styleName="modal__title">Create post</h2>
        </div>
        <div styleName="modal__author-bar">
          <img src="/images/optimistictrousers.jpg" styleName="modal__avatar" />
          <div styleName="modal__text">
            <p styleName="modal__surtitle">posting as</p>
            <h3 styleName="modal__name">Bob Jones</h3>
          </div>
        </div>
        <div styleName="modal__content">
          <textarea
            styleName="modal__textarea"
            placeholder="What's cooking, Bob?"
          ></textarea>
        </div>
        <div styleName="modal__controls">
          <div styleName="modal__interactives">
            <div styleName="modal__emoji">🙂</div>
            <label styleName="modal__label">
              <input type="file" styleName="modal__file" />
              <FcGallery styleName="modal__icon modal__icon--gallery" />
              Add picture
            </label>
          </div>
          <button styleName="modal__button modal__button--submit">Post</button>
        </div>
      </form>
    </div>
  );
};

export default CSSModules(CreatePostModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});