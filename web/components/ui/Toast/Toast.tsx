import { FC } from "react";
import CSSModules from "react-css-modules";
import { CgCloseO } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { FcCheckmark } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useToastContext from "../../../hooks/useToastContext";
import styles from "./Toast.module.css";

interface Props {
  visible: boolean;
  params: {
    type: string;
    message: string;
  };
}

const Toast: FC<Props> = ({ visible, params }) => {
  const { setToastVisible }: any = useToastContext();

  // Class is dynamically set according to toast param and visible boolean
  return (
    <div styleName={`toast toast--error ${visible ? "toast--visible" : "toast--invisible"}`}>
      <button onClick={() => setToastVisible(false)} styleName="toast__button">
        <CgClose styleName="toast__icon toast__icon--exit" />
      </button>
      <div styleName="toast__container">
        <CgCloseO styleName="toast__icon toast__icon--main" />
        {/* <IoMdCheckmarkCircleOutline styleName="toast__icon toast__icon--main"/> */}
      </div>
      <div styleName="toast__content">
        <p styleName="toast__bold">Error</p>
        <p styleName="toast__text">Invalid credentials</p>
      </div>
    </div>
  );
};

export default CSSModules(Toast, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
