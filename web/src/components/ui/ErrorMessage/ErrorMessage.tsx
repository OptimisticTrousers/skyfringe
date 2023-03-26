import { FC } from "react";
import CSSModules from "react-css-modules";
import { GoAlert } from "react-icons/go";
import styles from "./ErrorMessage.module.css";

interface Props {
  message: string;
}

const ErrorMessage: FC<Props> = ({ message }) => {
  return (
    <p styleName="message">
      <GoAlert styleName="message__icon" />
      <span styleName="message__text">{message}</span>
    </p>
  );
};

export default CSSModules(ErrorMessage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
