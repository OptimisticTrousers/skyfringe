import React, { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./ModalContainer.module.css";
import useDisableScroll from "../../hooks/useDisableScroll";
import { AiFillCloseSquare } from "react-icons/ai";

interface Props {
  children: JSX.Element[] | JSX.Element;
  title: string;
  toggleModal: () => void;
}

const ModalContainer: FC<Props> = ({ children, title, toggleModal }) => {
  useDisableScroll();
  return (
    <div styleName="modal">
      <div styleName="modal__container">
        <header styleName="modal__header">
          <button styleName="modal__button" onClick={toggleModal}>
            <AiFillCloseSquare styleName="modal__icon" />
          </button>
          <div styleName="modal__title-bar">
            <h2 styleName="modal__title">{title}</h2>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default CSSModules(ModalContainer, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
