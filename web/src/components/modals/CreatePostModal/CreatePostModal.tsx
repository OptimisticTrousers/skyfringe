import { FC, useContext, useState, ChangeEvent, FormEvent } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import { ToastContext } from "../../../context/ToastContext";
import useCreatePost from "../../../hooks/useCreatePost";
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import { Loading, ImagePreview, ImageUploadBtn, Avatar } from "../../ui";
import ModalContainer from "../ModalContainer";
import styles from "./CreatePostModal.module.css";
import { PostWithStringId as IPost } from "@backend/types";
import EmojiPicker from "emoji-picker-react";
import EmojiPickerBtn from "../../ui/EmojiPickerBtn/EmojiPickerBtn";

interface Props {
  toggleModal: () => void;
  setFeed: any;
}

const CreatePostModal: FC<Props> = ({ toggleModal, setFeed }) => {
  const { user } = useContext(AuthContext);
  const [postText, setPostText] = useState("");
  const { createPost, loading, error } = useCreatePost();
  const { showToast } = useContext(ToastContext);
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading } =
    useImageThumbnail();

  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState<any>(null);

  const disabled = postText.length === 0 && !imageData;

  const onEmojiClick = (emojiObject: any) => {
    setPostText((prevState) => prevState + emojiObject.emoji);
  };

  const handleChangePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = new FormData();
    newPost.append("content", postText);
    newPost.append("image", imageFile);
    const createdPost = await createPost(newPost);
    setFeed((prevPosts: IPost[]) => {
      const posts = structuredClone(prevPosts);
      posts.unshift(createdPost);
      return posts;
    });
    toggleModal();
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
      <form
        styleName="modal__form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div styleName="modal__author-bar">
          <Avatar
            src={user.photo && user.photo.imageUrl}
            alt={user.photo && user.photo.altText}
            size={"md"}
          />
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
            <EmojiPickerBtn onEmojiClick={onEmojiClick} modal={true}/>
            <ImageUploadBtn
              handleChange={handlePhoto}
              imageValue={imageValue}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
              removeThumbnail={removeThumbnail}
            />
          </div>
          <button
            styleName="modal__button modal__button--submit"
            disabled={disabled}
            type="submit"
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
