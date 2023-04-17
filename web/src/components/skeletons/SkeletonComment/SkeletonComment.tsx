import CSSModules from "react-css-modules";
import styles from "./SkeletonComment.module.css";

const SkeletonComment = () => {
  return (
    <div styleName="skeleton">
      <div styleName="skeleton__left">
        <div styleName="skeleton__avatar" className="skeleton"></div>
      </div>
      <div styleName="skeleton__right">
        <div styleName="skeleton__body">
          <div styleName="skeleton__top">
            <div styleName="skeleton__name" className="skeleton"></div>
            <div styleName="skeleton__date" className="skeleton"></div>
          </div>
          <div styleName="skeleton__description" className="skeleton"></div>
        </div>
        <div styleName="skeleton__controls">
          <div styleName="skeleton__group">
            <div styleName="skeleton__control" className="skeleton"></div>
            <div styleName="skeleton__control" className="skeleton"></div>
          </div>
          <div styleName="skeleton__group">
            <div styleName="skeleton__control" className="skeleton"></div>
            <div styleName="skeleton__control" className="skeleton"></div>
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
