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
import { AuthContext } from "../../../context/AuthContext";
import { ToastContext } from "../../../context/ToastContext";
import useCreatePost from "../../../hooks/useCreatePost";
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import { Loading } from "../../ui";
import ImagePreview from "../../ui/ImagePreview";
import ImageUploadBtn from "../../ui/ImageUploadBtn";
import ModalContainer from "../ModalContainer";
import styles from "./CreatePostModal.module.css";

interface Props {
  toggleModal: () => void;
}

const CreatePostModal: FC<Props> = ({ toggleModal }) => {
  const { user } = useContext(AuthContext);
  const [postText, setPostText] = useState("");
  const { createPost, data, loading, error } = useCreatePost(toggleModal);
  const { showToast } = useContext(ToastContext);
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading } =
    useImageThumbnail();
  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const disabled = postText.length === 0 && !imageData;

  const handleChangePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ content: postText });
  };

  const handlePhotoPicked = (event: any) => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].size > 10485760) {
      showToast("error", "File is too big. Max size is 10MB.");
      return;
    }
  };

  const handlePhoto = (event: any) => {
    handleFile(event.target.files[0]);
  };

  const handleClearPhoto = () => {
    setImageValue("");
    setImageFile(null);
    removeThumbnail();
  };

  return (
    <ModalContainer title="Create Post" toggleModal={toggleModal}>
      <form styleName="modal__form" onSubmit={handleSubmit}>
        <div styleName="modal__author-bar">
          <img src={user?.photo?.imageUrl} styleName="modal__avatar" />
          <div styleName="modal__text">
            <p styleName="modal__surtitle">posting as</p>
            <h3 styleName="modal__name">{user?.fullName}</h3>
          </div>
        </div>
        <div styleName="modal__content">
          <textarea
            styleName="modal__textarea"
            placeholder="What's cooking, Bob?"
            onChange={handleChangePostText}
            value={postText}
          ></textarea>
          {imageLoading && <Loading />}
          {imageData && (
            <ImagePreview
              imageData={imageData}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
              removeThumbnail={removeThumbnail}
            />
          )}
        </div>

        <div styleName="modal__controls">
          <div styleName="modal__interactives">
            <div styleName="modal__emoji">🙂</div>
            <ImageUploadBtn
              handleChange={handlePhoto}
              imageValue={imageValue}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
            />
          </div>
          <button
            styleName="modal__button modal__button--submit"
            disabled={disabled}
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
