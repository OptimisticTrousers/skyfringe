import { FC } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./PasswordContainer.module.css";

interface Props {
  children: JSX.Element[] | JSX.Element;
  showPassword: boolean;
  handleClick: () => void;
  right: number;
  disabled: boolean;
}

// Used to house a input/label, and provide a show/hide functionality for passwords
const PasswordContainer: FC<Props> = ({
  children,
  showPassword,
  handleClick,
  right,
  disabled
}) => {
  return (
    <div styleName="password-container">
      {/* Expect password input/label here */}
      {children}
      <button
        style={{ right }}
        styleName="password-container__button"
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-label={`${
          showPassword
            ? "Show password as plain text. Warning: this will display your password on the screen."
            : "Hide password."
        }`}
      >
        {showPassword ? (
          <AiOutlineEye styleName="password-container__icon" />
        ) : (
          <AiOutlineEyeInvisible styleName="password-container__icon" />
        )}
      </button>
    </div>
  );
};

export default CSSModules(PasswordContainer, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
