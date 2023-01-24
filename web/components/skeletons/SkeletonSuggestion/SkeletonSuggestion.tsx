import React from "react"
import CSSModules from "react-css-modules"
import Card from "../../Card/Card";
import styles from "./SkeletonSuggestion.module.css";

const SkeletonSuggestion = () => {
  return (
    <div styleName="skeleton">
      <div styleName="skeleton__details">
        <div styleName="skeleton__avatar" className="skeleton"></div>
        <div styleName="skeleton__text" className="skeleton"></div>
      </div>
      <div styleName="skeleton__button" className="skeleton"></div>
    </div>
  )
}

export default CSSModules(SkeletonSuggestion, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})