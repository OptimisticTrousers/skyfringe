import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./TopMenu.module.css";
import Suggestions from "../Suggestions/Suggestions";

const TopMenu = () => {
  const [toggleSuggestions, setToggleSuggestions] = useState(false);

  const handleSuggestions = () => {
    setToggleSuggestions((prevValue) => !prevValue);
  };

  return (
    <header styleName="menu">
      <div styleName="menu__buttons">
        <button styleName="menu__button" onClick={handleSuggestions}>
          Suggestions For you
        </button>
      </div>
      <div
        styleName={`menu__action ${
          toggleSuggestions && "menu__action--active"
        }`}
      >
        {toggleSuggestions && <Suggestions />}
      </div>
    </header>
  );
};

export default CSSModules(TopMenu, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
