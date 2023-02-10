import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./ErrorMessage.module.css";

interface Props {
  message: string;
}

const ErrorMessage: FC<Props> = ({ message }) => {
  return <p styleName="message">{message}</p>;
};

export default CSSModules(ErrorMessage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
