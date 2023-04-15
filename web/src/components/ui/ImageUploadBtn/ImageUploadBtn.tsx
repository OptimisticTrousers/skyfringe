import CSSModules from "react-css-modules";
import { FcGallery } from "react-icons/fc";
import styles from "./ImageUploadBtn.module.css";

// Carefully designed custom image file input. Due to being an input, no button role or features need to be added.
const ImageUploadBtn = ({
  handleChange,
  imageValue,
  setImageValue,
  setImageFile,
}: any) => {
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
          onChange={(e: any) => {
            setImageValue(e.target.value);
            setImageFile(e.target.files[0]);
            handleChange(e);
          }}
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
