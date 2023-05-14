import { useContext } from "react";
import CSSModules from "react-css-modules";
import { SlClose } from "react-icons/sl";
import { ToastContext } from "../../../context/ToastContext";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./ImagePreview.module.css";

const ImagePreview = ({
  imageData,
  setImageValue,
  setImageFile,
  removeThumbnail,
  setImageUpdated,
}: any) => {
  const { showToast } = useContext(ToastContext);

  const removeImage = () => {
    setImageValue("");
    setImageFile(null);
    removeThumbnail();
    setImageUpdated(true);
  };

  const handleClose = () => {
    removeImage();
  };

  const handleError = () => {
    removeImage();
    showToast(
      "error",
      "Please upload a valid image of the type .png, .jpg, .jpeg, or .webp"
    );
  };
  return (
    <div styleName="preview">
      <img
        styleName="preview__image"
        src={imageData}
        alt="Preview image"
        onError={handleError}
      />
      <button
        aria-label="Remove image"
        styleName="preview__button"
        type="button"
        onClick={handleClose}
      >
        <SlClose styleName="preview__icon" />
      </button>
    </div>
  );
};

export default CSSModules(ImagePreview, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
