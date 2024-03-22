import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import styles from "./Card.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Card: FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext)
  return <div styleName={`card card--${theme}`}>{children}</div>;
};

export default CSSModules(Card, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
