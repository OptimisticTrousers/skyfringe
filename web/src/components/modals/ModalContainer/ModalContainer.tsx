import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { AiFillCloseSquare } from "react-icons/ai";
import useDisableScroll from "../../../hooks/useDisableScroll";
import styles from "./ModalContainer.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

interface Props {
  children: JSX.Element[] | JSX.Element;
  title: string;
  toggleModal: () => void;
}

const ModalContainer: FC<Props> = ({ children, title, toggleModal }) => {
  useDisableScroll();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      styleName="modal"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div styleName={`modal__container modal__container--${theme}`} className="scale-down">
        <header styleName="modal__header">
          <button
            styleName="modal__button"
            onClick={toggleModal}
            aria-label="Close modal"
          >
            <AiFillCloseSquare styleName="modal__icon" />
          </button>
          <div styleName="modal__title-bar">
            <h2 styleName="modal__title" id="modal-title">
              {title}
            </h2>
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
