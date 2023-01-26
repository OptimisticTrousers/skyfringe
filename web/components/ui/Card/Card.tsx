import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./Card.module.css";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Card: FC<Props> = ({ children }) => {
  return <div styleName="card">{children}</div>;
};

export default CSSModules(Card, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
