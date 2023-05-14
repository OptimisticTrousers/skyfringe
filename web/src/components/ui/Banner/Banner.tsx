import { FC } from "react";
import CSSModules from "react-css-modules";
import bannerImageFallback from "../../../utils/bannerImageFallback";
import styles from "./Banner.module.css";

interface Props {
  src: string;
  altText: string;
}

const Banner: FC<Props> = ({ src, altText }) => {
  return (
    <img
      styleName="banner"
      src={src}
      alt={altText}
      onError={bannerImageFallback}
    />
  );
};

export default CSSModules(Banner, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
