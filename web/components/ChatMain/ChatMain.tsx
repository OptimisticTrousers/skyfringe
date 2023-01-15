import React from "react"
import CSSModules from "react-css-modules"
import styles from "./ChatMain.module.css";

const ChatMain = () => {
  return (
    <div styleName="main">
      bob jones
    </div>
  )
}

export default CSSModules(ChatMain, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})