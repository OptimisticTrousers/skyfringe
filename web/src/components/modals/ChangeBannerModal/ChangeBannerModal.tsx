import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { FcGallery } from "react-icons/fc";
import { VscClose } from "react-icons/vsc";
import { AuthContext } from "../../../context/AuthContext";
import { useImageThumbnail } from "../../../hooks/useImageThumbnail";
import useUpdateBanner from "../../../hooks/useUpdateBanner";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { ImagePreview, ImageUploadBtn, Loading } from "../../ui";
import ModalContainer from "../ModalContainer";
import styles from "./ChangeBannerModal.module.css";

interface Props {
  toggleModal: () => void;
  title: string;
  setData: any;
}

const ChangeBannerModal: FC<Props> = ({ title, toggleModal, setData }) => {
  const { user } = useContext(AuthContext);
  const {
    handleFile,
    removeThumbnail,
    imageData,
    setImageData,
    setImageUpdated,
    imageError,
    imageUpdated,
    imageLoading,
  } = useImageThumbnail();

  const { updateBanner, loading, error } = useUpdateBanner();

  const [imageValue, setImageValue] = useState("");
  const [imageFile, setImageFile] = useState<any>(null);

  const disabled = !imageData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("imageUpdated", imageUpdated.toString());
    const updatedUser = await updateBanner(user._id, formData);
    setData(updatedUser)
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
  useEffect(() => {
    if (user?.cover) {
      setImageData(user?.cover.imageUrl);
    }
  }, [user.cover, setImageData]);
  return (
    <ModalContainer title={title} toggleModal={toggleModal}>
      <form styleName="modal" onSubmit={handleSubmit}>
        <div styleName="modal__container">
          {imageLoading && <Loading />}
          {imageData ? (
            <ImagePreview
              imageData={imageData}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
              removeThumbnail={removeThumbnail}
            />
          ) : (
            <p styleName="modal__message">No picture added...</p>
          )}
        </div>
        <div styleName="modal__controls">
          <div styleName="modal__interactives">
            <ImageUploadBtn
              handleChange={handlePhoto}
              imageValue={imageValue}
              setImageValue={setImageValue}
              setImageFile={setImageFile}
              removeThumbnail={removeThumbnail}
            />
          </div>
          <button styleName="modal__button modal__button--submit" disabled={disabled}>Save</button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default CSSModules(ChangeBannerModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
