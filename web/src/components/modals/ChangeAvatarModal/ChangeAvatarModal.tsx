import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { FcGallery } from "react-icons/fc";
import { VscClose } from "react-icons/vsc";
import { AuthContext } from "../../../context/AuthContext";
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { ImagePreview, ImageUploadBtn, Loading } from "../../ui";
import ModalContainer from "../ModalContainer";
import styles from "./ChangeAvatarModal.module.css";

interface Props {
  toggleModal: () => void;
  title: string;
}

const ChangePictureModal: FC<Props> = ({ title, toggleModal }) => {
  const { user } = useContext(AuthContext);
  const { handleFile, removeThumbnail, imageData, imageError, imageLoading } =
    useImageThumbnail();

  const {updateUser, loading} = useUpdateUser();
  
  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState<any>(null);

  // const disabled = loading || !imageData;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("imageUpdated", imageFile);
    updateUser(user._id, formData);
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
    <ModalContainer title="Edit avatar" toggleModal={toggleModal}>
      <form styleName="modal">
        <div styleName="modal__container">
          <img src="/images/optimistictrousers.jpg" styleName="modal__avatar" />
          <button styleName="modal__button modal__button--picture">
            <VscClose styleName="modal__icon modal__icon--exit" />
          </button>
        </div>
        {imageLoading && <Loading />}
        {imageData && (
          <ImagePreview
            imageData={imageData}
            setImageValue={setImageValue}
            setImageFile={setImageFile}
            removeThumbnail={removeThumbnail}
          />
        )}
        <div styleName="modal__controls">
          <div styleName="modal__interactives">
            <ImageUploadBtn />
          </div>
          <button styleName="modal__button modal__button--submit">Save</button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(ChangePictureModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
