import { useRef, useState } from "react";
import CSSModules from "react-css-modules";
import Suggestions from "../Suggestions";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
  const suggestionsParentRef = useRef<any>(null);
  const [toggleSuggestions, setToggleSuggestions] = useState(false);

  const handleSuggestions = () => {
    setToggleSuggestions((prevValue) => !prevValue);
  };

  return (
    <header styleName="menu">
      <div styleName="menu__buttons">
        <button styleName="menu__button" onClick={handleSuggestions}>
          Suggestions For You
        </button>
      </div>
      <div
        data-testid="menu"
        ref={suggestionsParentRef}
        style={
          toggleSuggestions
            ? {
                height: suggestionsParentRef.current.scrollHeight + "px",
                visibility: "visible",
              }
            : {
                height: "0px",
                visibility: "hidden",
              }
        }
        styleName={`menu__action`}
      >
        <Suggestions />
      </div>
    </header>
  );
};

export default CSSModules(TopMenu, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
