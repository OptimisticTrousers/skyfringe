import { FC } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import userImageFallback from "../../../utils/userImageFallback";
import styles from "./Avatar.module.css";

interface Props {
  src: string;
  alt: string;
  size: string;
}

const Avatar: FC<Props> = ({ src, alt, size }) => {
  let sizeClass: string;

  switch (size) {
    case "friend":
      sizeClass = "avatar__image--friend";
      break;
    case "xxl":
      sizeClass = "avatar__image--extra-extra-large";
      break;
    case "xl":
      sizeClass = "avatar__image--extra-large";
      break;
    case "lg":
      sizeClass = "avatar__image--large";
      break;
    case "md":
      sizeClass = "avatar__image--medium";
      break;
    case "sm":
      sizeClass = "avatar__image--small";
      break;
    default:
      sizeClass = "avatar__image--small";
      break;
  }
  return (
    <img
      styleName={`avatar__image ${sizeClass}`}
      src={src || "/images/anon-user-lg.png"}
      alt={alt || "Anonymous user avatar"}
      onError={userImageFallback}
    />
  );
};

export default CSSModules(Avatar, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
