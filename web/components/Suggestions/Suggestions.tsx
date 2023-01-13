import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Suggestions.module.css";

const Suggestions = () => {
  return (
    <div styleName="suggestions">
      <div styleName="suggestions__text">
        <h2 styleName="suggestions__title">Suggestions For You</h2>
        <a styleName="suggestions__link">See All</a>
      </div>
      <div styleName="suggestions__suggestion">
        <div styleName="suggestions__user">
          <img styleName="suggestions__avatar" src="optimistictrousers.jpg" />
          <div styleName="suggestions__subtitle">Sarah Tancredi</div>
        </div>
        <button styleName="suggestions__button suggestions__button--follow">
          Follow
        </button>
      </div>
      <div styleName="suggestions__suggestion">
        <div styleName="suggestions__user">
          <img styleName="suggestions__avatar" src="optimistictrousers.jpg" />
          <div styleName="suggestions__subtitle">Aruthur Shelby</div>
        </div>
        <button styleName="suggestions__button suggestions__button--followed">
          Followed
        </button>
      </div>
      <div styleName="suggestions__suggestion">
        <div styleName="suggestions__user">
          <img styleName="suggestions__avatar" src="optimistictrousers.jpg" />
          <div styleName="suggestions__subtitle">Vin Diesel</div>
        </div>
        <button styleName="suggestions__button suggestions__button--follow">
          Follow
        </button>
      </div>
    </div>
  );
};

export default CSSModules(Suggestions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
