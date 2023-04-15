import CSSModules from "react-css-modules";
import { SlClose } from "react-icons/sl";
import styles from "./ImagePreview.module.css";

const ImagePreview = ({
  imageData,
  setImageValue,
  setImageFile,
  removeThumbnail,
}: any) => {
  const handleClose = () => {
    setImageValue("");
    setImageFile(null);
    removeThumbnail();
  };
  return (
    <div styleName="preview">
      <img styleName="preview__image" src={imageData} alt="Preview image" />
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
