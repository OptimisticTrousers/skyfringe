import { useContext } from "react";
import CSSModules from "react-css-modules";
import { FcGallery } from "react-icons/fc";
import { ToastContext } from "../../../context/ToastContext";
import styles from "./ImageUploadBtn.module.css";

// Carefully designed custom image file input. Due to being an input, no button role or features need to be added.
const ImageUploadBtn = ({
  handleChange,
  imageValue,
  setImageValue,
  setImageFile,
  removeThumbnail,
}: any) => {
  const { showToast } = useContext(ToastContext);

  const handlePhotoPicked = (event: any) => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].size > 10485760) {
      showToast("error", "File is too big. Max size is 10MB.");
      setImageValue("");
      setImageFile(null);
      removeThumbnail();
    } else {
      setImageValue(event.target.value);
      setImageFile(event.target.files[0]);
      handleChange(event);
    }
  };

  return (
    // Accepts only the formats specified
    <>
      <label htmlFor="image" styleName="file__label">
        <input
          type="file"
          value={imageValue}
          name="image"
          id="image"
          accept="image/jpg, image/jpeg, image/png, image/webp"
          styleName="file__input"
          onChange={handlePhotoPicked}
        />
        <FcGallery styleName="file__icon" />
        Add picture
      </label>
    </>
  );
};

export default CSSModules(ImageUploadBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
