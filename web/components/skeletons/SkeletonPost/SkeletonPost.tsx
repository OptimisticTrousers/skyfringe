import React from "react"
import styles from "./SkeletonPost.module.css";
import CSSModules from "react-css-modules"
import Card from "../../Card/Card";

const SkeletonPost = () => {
  return (
    <Card>
      <div styleName="post__top">
        <div styleName="post__container">
          <div styleName="post__image skeleton"></div>
          <div styleName="post__text skeleton skeleton-text"></div>
          <div styleName="post__text skeleton skeleton-text"></div>
        </div>
      </div>
    </Card>
  )
}

export default CSSModules(SkeletonPost, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})