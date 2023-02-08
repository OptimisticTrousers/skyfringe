import { FC } from "react";
import CSSModules from "react-css-modules";
import zxcvbn from "zxcvbn";
import styles from "./PasswordStrengthMeter.module.css";

interface Props {
  password: string;
}

const PasswordStrengthMeter: FC<Props> = ({ password }) => {
  const createPasswordLabel = (result) => {
    let value = null;
    if (result.password === "") {
      value = 0;
    } else {
      value = result.score + 1;
    }

    switch (value) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Weak";
      case 3:
        return "Fair";
      case 4:
        return "Good";
      case 5:
        return "Strong";
      default:
        return "";
    }
  };

  const calculateWidth = (result) => {
    const transitionStyle = "width 0.5s ease-in-out";

    let value = null;
    if (result.password === "") {
      value = 0;
    } else {
      value = result.score + 1;
    }

    switch (value) {
      case 0:
        return {
          width: "0%",
          backgroundColor: "#e5e7eb",
          transition: transitionStyle,
        };
      case 1:
        return {
          width: "16%",
          backgroundColor: "#dd4b39",
          transition: transitionStyle,
        };
      case 2:
        return {
          width: "16%",
          backgroundColor: "3dd4b39",
          transition: transitionStyle,
        };
      case 3:
        return {
          width: "45%",
          backgroundColor: "#f6ad55",
          transition: transitionStyle,
        };
      case 4:
        return {
          width: "70%",
          backgroundColor: "#175ddc",
          transition: transitionStyle,
        };
      case 5:
        return {
          width: "100%",
          backgroundColor: "#00a65a",
          transition: transitionStyle,
        };
      default:
        return {
          width: "16%",
          backgroundColor: "#e5e7eb",
          transition: transitionStyle,
        };
    }
  };

  const testedResult = zxcvbn(password);

  return (
    <div styleName="meter">
      <div styleName="meter__container" style={calculateWidth(testedResult)}>
        <span styleName="meter__text">{createPasswordLabel(testedResult)}</span>
      </div>
    </div>
  );
};

export default CSSModules(PasswordStrengthMeter, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
