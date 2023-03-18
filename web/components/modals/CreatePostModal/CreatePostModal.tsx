import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import CSSModules from "react-css-modules";
import { FcGallery } from "react-icons/fc";
import { ToastContext } from "../../../context/ToastContext";
import useCreatePost from "../../../hooks/useCreatePost";
import ModalContainer from "../ModalContainer";
import styles from "./CreatePostModal.module.css";

interface Props {
  toggleModal: () => void;
}

const CreatePostModal: FC<Props> = ({ toggleModal }) => {
  const [postText, setPostText] = useState("");
  const { createPost, response, loading, error } = useCreatePost();
  const { showToast } = useContext(ToastContext);

  const isPostButtonDisabled = postText.length === 0;

  const handleChangePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", postText);
    createPost(formData);
  };

  useEffect(() => {
    if (error) {
      showToast("error", "An error occured while creating the post.");
      toggleModal();
    }
  }, [error, showToast, toggleModal]);

  useEffect(() => {
    if (response) {
      toggleModal();
    }
  }, [response, showToast, toggleModal]);

  return (
    <ModalContainer title="Create Post" toggleModal={toggleModal}>
      <form styleName="modal__form" onSubmit={handleSubmit}>
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
            onChange={handleChangePostText}
            value={postText}
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
          <button
            styleName="modal__button modal__button--submit"
            disabled={isPostButtonDisabled}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(CreatePostModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
