import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./ErrorMessage.module.css";

interface Props {
  text: string;
}

const ErrorMessage: FC<Props> = ({ text }) => {
  return <p styleName="message">{text}</p>;
};

export default CSSModules(ErrorMessage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
