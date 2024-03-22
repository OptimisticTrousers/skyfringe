import CSSModules from "react-css-modules";
import { Card } from "../../ui";
import styles from "./SkeletonPost.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonPost = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Card>
      <div styleName="skeleton__top" data-testid="skeleton-post">
        <div styleName="skeleton__container">
          <div styleName="skeleton__avatar" className={`skeleton skeleton--${theme}`}></div>
          <div styleName="skeleton__details">
            <div styleName="skeleton__text" className={`skeleton skeleton--${theme}`}></div>
            <div styleName="skeleton__text" className={`skeleton skeleton--${theme}`}></div>
          </div>
        </div>
        <div styleName="skeleton__actions" className={`skeleton skeleton--${theme}`}></div>
      </div>
      <div styleName="skeleton__content">
        <div styleName="skeleton__description " className={`skeleton skeleton--${theme}`}></div>
        <div styleName="skeleton__description " className={`skeleton skeleton--${theme}`}></div>
        <div styleName="skeleton__description " className={`skeleton skeleton--${theme}`}></div>
        <div
          styleName="skeleton__description skeleton__description--last "
          className={`skeleton skeleton--${theme}`}
        ></div>
        <div styleName="skeleton__image" className={`skeleton skeleton--${theme}`}></div>
        <div styleName="skeleton__controls">
          <div
            styleName="skeleton__control skeleton"
            className={`skeleton skeleton--${theme}`}
          ></div>
          <div
            styleName="skeleton__control skeleton"
            className={`skeleton skeleton--${theme}`}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default CSSModules(SkeletonPost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
