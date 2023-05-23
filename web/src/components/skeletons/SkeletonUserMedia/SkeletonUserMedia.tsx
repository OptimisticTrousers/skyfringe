import CSSModules from "react-css-modules";
import { Card } from "../../ui";
import Shimmer from "../Shimmer";
import styles from "./SkeletonUserMedia.module.css";

const SkeletonUserMedia = () => {
  return (
    <div styleName="skeleton">
      <Card>
        <div styleName="skeleton__top">
          <div styleName="skeleton__title" className="skeleton"></div>
        </div>
        <div styleName="skeleton__list">
          <div styleName="skeleton__image" className="skeleton">
            <Shimmer />
          </div>
          <div styleName="skeleton__image skeleton__image--large" className="skeleton">
            <Shimmer />
          </div>
          <div styleName="skeleton__image" className="skeleton">
            <Shimmer />
          </div>
          <div styleName="skeleton__image" className="skeleton">
            <Shimmer />
          </div>
          <div styleName="skeleton__image skeleton__image--large" className="skeleton">
            <Shimmer />
          </div>
          <div styleName="skeleton__image" className="skeleton">
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
