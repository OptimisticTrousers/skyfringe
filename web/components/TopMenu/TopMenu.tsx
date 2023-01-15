import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./TopMenu.module.css";
import Suggestions from "../Suggestions/Suggestions";
import Recent from "../Recent/Recent";

const TopMenu = () => {
  const [toggleSuggestions, setToggleSuggestions] = useState(false);

  const [toggleActivities, setToggleActivities] = useState(false);

  const handleSuggestions = () => {
    setToggleSuggestions((prevValue) => !prevValue);
  };

  const handleActivities = () => {
    setToggleActivities((prevValue) => !prevValue);
  };
  return (
    <header styleName="menu">
      <div styleName="menu__buttons">
        <button styleName="menu__button" onClick={handleSuggestions}>
          Suggestions For you
        </button>
        <button styleName="menu__button" onClick={handleActivities}>
          Recent Activity
        </button>
      </div>
      <div
        styleName={`menu__action ${
          toggleSuggestions && "menu__action--active"
        }`}
      >
        {toggleSuggestions && <Suggestions />}
      </div>
      <div
        styleName={`menu__action ${toggleActivities && "menu__action--active"}`}
      >
        {toggleActivities && <Recent />}
      </div>
    </header>
  );
};

export default CSSModules(TopMenu, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
