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
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import { Loading } from "../../ui";
import ImagePreview from "../../ui/ImagePreview";
import ImageUploadBtn from "../../ui/ImageUploadBtn";
import ModalContainer from "../ModalContainer";
import styles from "./EditPostModal.module.css";

interface Props {
  toggleModal: () => void;
  post: any;
}

const EditPostModal: FC<Props> = ({ toggleModal, post }) => {
  const { user } = useContext(AuthContext);
  const {
    handleFile,
    removeThumbnail,
    imageData,
    imageError,
    imageLoading,
    setImageData,
  } = useImageThumbnail();

  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Set state initially o current post text
  const [postText, setPostText] = useState(post?.content);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // editPost({})
    // toggleModal()
  };

  const handlePostText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
  };

  const handlePhoto = (event: any) => {
    handleFile(event.target.files[0]);
  };

  // Initialise imageData state to any existing image in the post
  useEffect(() => {
    if (post.photo) {
      setImageData(post.photo.imageUrl);
    }
  }, [post.image, setImageData]);

  return (
    <ModalContainer title="Edit Post" toggleModal={toggleModal}>
      <form styleName="modal" onSubmit={handleSubmit}>
        <div styleName="modal__author-bar">
          <img src="/images/optimistictrousers.jpg" styleName="modal__avatar" />
          <div styleName="modal__text">
            <p styleName="modal__surtitle">posting as</p>
            <h3 styleName="modal__name">{user?.fullName}</h3>
          </div>
        </div>
        <div styleName="modal__content">
          <textarea
            styleName="modal__textarea"
            placeholder="What's cooking, Bob?"
            value={postText}
            onChange={handlePostText}
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
