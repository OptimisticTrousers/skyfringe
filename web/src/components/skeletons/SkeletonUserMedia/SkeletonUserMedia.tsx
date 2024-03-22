import CSSModules from "react-css-modules";
import { Card } from "../../ui";
import Shimmer from "../Shimmer";
import styles from "./SkeletonUserMedia.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonUserMedia = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName="skeleton">
      <Card>
        <div styleName="skeleton__top">
          <div styleName="skeleton__title" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="skeleton__list">
          <div styleName="skeleton__image" className={`skeleton skeleton--${theme}`}>
            <Shimmer />
          </div>
          <div styleName="skeleton__image skeleton__image--large" className={`skeleton skeleton--${theme}`}>
            <Shimmer />
          </div>
          <div styleName="skeleton__image" className={`skeleton skeleton--${theme}`}>
            <Shimmer />
          </div>
          <div styleName="skeleton__image" className={`skeleton skeleton--${theme}`}>
            <Shimmer />
          </div>
          <div styleName="skeleton__image skeleton__image--large" className={`skeleton skeleton--${theme}`}>
            <Shimmer />
          </div>
          <div styleName="skeleton__image" className={`skeleton skeleton--${theme}`}>
            <Shimmer />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(SkeletonUserMedia, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
