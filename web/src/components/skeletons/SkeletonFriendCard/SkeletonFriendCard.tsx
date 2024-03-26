import CSSModules from "react-css-modules";
import styles from "./SkeletonFriendCard.module.css";
import Shimmer from "../Shimmer/Shimmer";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonFriendCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName="skeleton">
      <div styleName="skeleton__avatar" className={`skeleton skeleton--${theme}`}></div>
      <div styleName="skeleton__details">
        <div styleName="skeleton__text" className={`skeleton skeleton--${theme}`}></div>
        <div styleName="skeleton__button" className={`skeleton skeleton--${theme}`}></div>
      </div>
      <Shimmer />
    </div>
  );
};

export default CSSModules(SkeletonFriendCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
