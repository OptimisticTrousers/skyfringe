import React from "react"
import CSSModules from "react-css-modules"
import styles from "./Friends.module.css";

const Friends = () => {
  return (
    <div styleName="friends">
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
    </div>
  )
}

export default CSSModules(Friends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})