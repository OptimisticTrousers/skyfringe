import CSSModules from "react-css-modules";
import styles from "./SkeletonFriendCard.module.css";
import Shimmer from "../Shimmer/Shimmer";

const SkeletonFriendCard = () => {
  return (
    <div styleName="skeleton">
      <div styleName="skeleton__avatar"></div>
      <div styleName="skeleton__details">
        <div styleName="skeleton__text"></div>
        <div styleName="skeleton__button"></div>
      </div>
      <Shimmer />
    </div>
  );
};

export default CSSModules(SkeletonFriendCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
