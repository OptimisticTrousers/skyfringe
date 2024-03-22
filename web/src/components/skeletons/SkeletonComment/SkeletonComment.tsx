import CSSModules from "react-css-modules";
import styles from "./SkeletonComment.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonComment = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName="skeleton">
      <div styleName="skeleton__left">
        <div styleName="skeleton__avatar" className={`skeleton skeleton--${theme}`}></div>
      </div>
      <div styleName="skeleton__right">
        <div styleName="skeleton__body">
          <div styleName="skeleton__top">
            <div styleName="skeleton__name" className={`skeleton skeleton--${theme}`}></div>
            <div styleName="skeleton__date" className={`skeleton skeleton--${theme}`}></div>
          </div>
          <div styleName="skeleton__description" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="skeleton__controls">
          <div styleName="skeleton__group">
            <div styleName="skeleton__control" className={`skeleton skeleton--${theme}`}></div>
            <div styleName="skeleton__control" className={`skeleton skeleton--${theme}`}></div>
          </div>
          <div styleName="skeleton__group">
            <div styleName="skeleton__control" className={`skeleton skeleton--${theme}`}></div>
            <div styleName="skeleton__control" className={`skeleton skeleton--${theme}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(SkeletonComment, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
