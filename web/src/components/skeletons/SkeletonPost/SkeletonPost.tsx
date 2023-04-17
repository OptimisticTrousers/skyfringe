import CSSModules from "react-css-modules";
import { Card } from "../../ui";
import styles from "./SkeletonPost.module.css";

const SkeletonPost = () => {
  return (
    <Card>
      <div styleName="skeleton__top" data-testid="skeleton-post">
        <div styleName="skeleton__container">
          <div styleName="skeleton__avatar" className="skeleton"></div>
          <div styleName="skeleton__details">
            <div styleName="skeleton__text" className="skeleton"></div>
            <div styleName="skeleton__text" className="skeleton"></div>
          </div>
        </div>
        <div styleName="skeleton__actions" className="skeleton"></div>
      </div>
      <div styleName="skeleton__content">
        <div styleName="skeleton__description " className="skeleton"></div>
        <div styleName="skeleton__description " className="skeleton"></div>
        <div styleName="skeleton__description " className="skeleton"></div>
        <div
          styleName="skeleton__description skeleton__description--last "
          className="skeleton"
        ></div>
        <div styleName="skeleton__image" className="skeleton"></div>
        <div styleName="skeleton__controls">
          <div
            styleName="skeleton__control skeleton"
            className="skeleton"
          ></div>
          <div
            styleName="skeleton__control skeleton"
            className="skeleton"
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
