import {
  FC,
  useContext,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ToastContext } from "../../../context/ToastContext";
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import useUpdatePost from "../../../hooks/useUpdatePost";
import { Loading, ImagePreview, ImageUploadBtn, Avatar } from "../../ui";
import EmojiPickerBtn from "../../ui/EmojiPickerBtn";
import ModalContainer from "../ModalContainer";
import styles from "./EditPostModal.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

interface Props {
  toggleModal: () => void;
  post: any;
  handleEditPost: any;
}

const EditPostModal: FC<Props> = ({ toggleModal, post, handleEditPost }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { updatePost, loading } = useUpdatePost();
  const { showToast } = useContext(ToastContext);

  const {
    handleFile,
    removeThumbnail,
    imageData,
    imageError,
    setImageUpdated,
    imageUpdated,
    imageLoading,
    setImageData,
  } = useImageThumbnail();

  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState<any>(null);

  // Set state initially o current post text
  const [postText, setPostText] = useState(post?.content);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postId = post._id;
    toggleModal();
    const newPost = new FormData();
    newPost.append("content", postText);
    newPost.append("image", imageFile);
    newPost.append("imageUpdated", imageUpdated.toString());
    const updatedPost = await updatePost(postId, newPost);
    handleEditPost(postId, updatedPost);
  };

  const handlePostText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
  };

  const onEmojiClick = (emojiObject: any) => {
    setPostText((prevState: string) => prevState + emojiObject.emoji);
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
  }, [post.photo, setImageData]);

  return (
    <ModalContainer title="Edit Post" toggleModal={toggleModal}>
      <form styleName="modal" onSubmit={handleSubmit}>
        <div styleName="modal__author-bar">
          <Avatar
            src={user.photo && user.photo.imageUrl}
            alt={user.photo && user.photo.altText}
            size={"md"}
          />
          <div styleName="modal__text">
            <p styleName={`modal__surtitle modal__surtitle--${theme}`}>posting as</p>
            <h3 styleName="modal__name">{user?.fullName}</h3>
          </div>
        </div>
        <div styleName="modal__content">
          <textarea
            styleName={`modal__textarea modal__textarea--${theme}`}
            placeholder={`What's cooking, ${user.fullName}?`}
            value={postText}
            onChange={handlePostText}
            maxLength={280}
          ></textarea>
          {imageLoading && <Loading />}
          {imageData && (
            <ImagePreview
              imageData={imageData}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
              removeThumbnail={removeThumbnail}
              setImageUpdated={setImageUpdated}
            />
          )}
        </div>
        <div styleName="modal__controls">
          <div styleName="modal__interactives">
            <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={true} position={2} />
            <ImageUploadBtn
              handleChange={handlePhoto}
              imageValue={imageValue}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
              removeThumbnail={removeThumbnail}
            />
          </div>
          <button styleName="modal__button" disabled={disabled} type="submit">
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
