import React, { FC } from "react"
import CSSModules from "react-css-modules"
import { AiFillCloseSquare } from "react-icons/ai";
import styles from "./Modal.module.css";

interface Props {
  title: string;
}

const Modal = () => {
  return (
    <div styleName="modal">
      <form styleName="modal__form">
        <h2 styleName="modal__title">Create post</h2>
        {/* <button styleName="modal__button modal__button--exit"></button> */}
        <AiFillCloseSquare styleName="modal__icon"/>
      </form>
    </div>
  )
}

export default CSSModules(Modal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
})