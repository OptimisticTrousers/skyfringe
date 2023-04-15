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
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import useUpdatePost from "../../../hooks/useUpdatePost";
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
  const { updatePost, loading } = useUpdatePost();
  const { showToast } = useContext(ToastContext);

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
    updatePost(post._id, { content: postText });
    toggleModal();
  };

  const handlePhotoPicked = (event: any) => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].size > 10485760) {
      showToast("error", "File is too big. Max size is 10MB.");
      return;
    }
  };

  const handlePostText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
  };

  const handlePhoto = (event: any) => {
    handleFile(event.target.files[0]);
  };

  const disabled = postText.length === 0 && !imageData;

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
              handlePhotoPicked={handlePhotoPicked}
            />
          </div>
          <button styleName="modal__button" disabled={disabled}>
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(EditPostModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
