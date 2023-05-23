import { FC } from "react";
import CSSModules from "react-css-modules";
import bannerImageFallback from "../../../utils/bannerImageFallback";
import bannerImageLoading from "../../../utils/bannerImageLoading";
import styles from "./Banner.module.css";

interface Props {
  src: string;
  altText: string;
}

const Banner: FC<Props> = ({ src, altText }) => {
  return (
    <img
      styleName="banner"
      src={src || "/images/loading.png"}
      alt={altText || "Default loading banner"}
      onError={bannerImageFallback}
    />
  );
};

export default CSSModules(Banner, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
