import React from "react";
import styles from "./SkeletonPost.module.css";
import postStyles from "../../Post/Post.module.css";
import CSSModules from "react-css-modules";
import Card from "../../Card/Card";

const SkeletonPost = () => {
  return (
    <Card>
      <div styleName="skeleton__top">
        <div styleName="skeleton__container">
          <div styleName="skeleton__avatar skeleton"></div>
          <div styleName="skeleton__details">
            <div styleName="skeleton__text skeleton"></div>
            <div styleName="skeleton__text skeleton"></div>
          </div>
        </div>
        <div styleName="skeleton__actions skeleton"></div>
      </div>
      <div styleName="skeleton__content">
        <div styleName="skeleton__text skeleton"></div>
        <div styleName="skeleton__text skeleton"></div>
        <div styleName="skeleton__text skeleton"></div>
        <div styleName="skeleton__text skeleton"></div>
        <div styleName="skeleton__image skeleton"></div>
        {/* <div styleName="skeleton__controls">
          <div styleName="skeleton__control skeleton"></div>
          <div styleName="skeleton__control skeleton"></div>
        </div> */}
      </div>
    </Card>
  );
};

export default CSSModules(SkeletonPost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
