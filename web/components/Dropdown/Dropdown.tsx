import React from "react"
import CSSModules from "react-css-modules"
import styles from "./Dropdown.module.css";


const Dropdown = () => {
  return (
    <div styleName="dropdown">
      <button styleName="dropdown__button">

      </button>
    </div>
  )
}

export default CSSModules(Dropdown, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})