import CSSModules from "react-css-modules";
import styles from "./SkeletonSuggestion.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonSuggestion = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName="skeleton">
      <div styleName="skeleton__details">
        <div styleName="skeleton__avatar" className={`skeleton skeleton--${theme}`}></div>
        <div styleName="skeleton__text" className={`skeleton skeleton--${theme}`}></div>
      </div>
      <div styleName="skeleton__button" className={`skeleton skeleton--${theme}`}></div>
    </div>
  );
};

export default CSSModules(SkeletonSuggestion, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
