import { FC } from "react";
import CSSModules from "react-css-modules";
import { CgCloseO } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { useToastContext } from "../../../context/ToastContext";
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
  console.log(visible)
  return (
    <div styleName={`toast ${visible ? "toast--visible": "toast--invisible"}`}>
      <button
        onClick={() => setToastVisible(false)}
        styleName="toast__button"
      >
        <GrClose styleName="toast__icon" />
      </button>
      <div styleName="toast__container">
        <CgCloseO styleName="toast__icon" />
      </div>
      <div styleName="toast__content">
        <p styleName="toast__message"></p>
      </div>
    </div>
  );
};

export default CSSModules(Toast, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
