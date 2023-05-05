import { FC } from "react";
import CSSModules from "react-css-modules";
import styles from "./FriendRequestBtn.module.css";

interface Props {
  type: string;
  handleClick: () => void;
  disabled: boolean;
  text: string;
}

const FriendRequestBtn: FC<Props> = ({ type, text, handleClick, disabled }) => {
  let classModifier: string = "";

  switch (type) {
    case "blue":
      classModifier = "button--blue";
      break;
    case "white":
      classModifier = "button--white";
      break;
  }

  return (
    <button
      onClick={handleClick}
      styleName={`button ${classModifier}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CSSModules(FriendRequestBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
