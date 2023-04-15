import { FC, useContext } from "react";
import CSSModules from "react-css-modules";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CgCloseO } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { ToastParams, ToastContext } from "../../../context/ToastContext";
import styles from "./Toast.module.css";

interface Props {
  visible: boolean;
  params: ToastParams;
}

const Toast: FC<Props> = ({ visible, params }) => {
  const { setToastVisible } = useContext(ToastContext);

  const disableToast = () => {
    setToastVisible(false);
  };

  // Class is dynamically set according to toast param and visible boolean
  return (
    <div
      role="status"
      aria-hidden={visible ? false : true}
      styleName={`toast ${params.type === "error" && "toast--error"} ${
        params.type === "success" && "toast--success"
      } ${visible ? "toast--visible" : "toast--invisible"}`}
    >
      <button
        onClick={disableToast}
        styleName={`toast__button ${
          params.type === "error" && "toast__button--error"
        } ${params.type === "success" && "toast__button--success"}`}
      >
        <CgClose styleName="toast__icon toast__icon--exit" />
      </button>
      <div styleName="toast__container">
        {params.type === "error" ? (
          <CgCloseO styleName="toast__icon toast__icon--main" />
        ) : (
          <IoMdCheckmarkCircleOutline styleName="toast__icon toast__icon--main" />
        )}
      </div>
      <div styleName="toast__content">
        <p styleName="toast__bold">
          {params.type === "error" ? "Error" : "Success"}
        </p>
        <p styleName="toast__text">{params.message}</p>
      </div>
      <div
        styleName={`toast__progress ${
          params.type === "error" && "toast__progress--error"
        } ${params.type === "success" && "toast__progress--success"} ${
          visible && "toast__progress--active"
        }`}
      ></div>
    </div>
  );
};

export default CSSModules(Toast, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
