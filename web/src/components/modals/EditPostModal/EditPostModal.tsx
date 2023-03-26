import { FC } from "react";
import CSSModules from "react-css-modules";
import { FcGallery } from "react-icons/fc";
import ModalContainer from "../ModalContainer";
import styles from "./EditPostModal.module.css";

interface Props {
  toggleModal: () => void;
}

const EditPostModal: FC<Props> = ({ toggleModal }) => {
  return (
    <ModalContainer title="Edit Post" toggleModal={toggleModal}>
      <form styleName="modal">
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
          <button styleName="modal__button">Save</button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(EditPostModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
