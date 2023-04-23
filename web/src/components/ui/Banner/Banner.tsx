import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./Banner.module.css";

interface Props {
  src: string;
  altText: string;
}

const Banner: FC<Props> = ({ src, altText }) => {
  return <img styleName="banner" src={src} alt={altText} />;
};

export default CSSModules(Banner, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
