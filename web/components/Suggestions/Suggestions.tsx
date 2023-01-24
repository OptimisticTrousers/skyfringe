import Link from "next/link";
import React from "react";
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import SkeletonSuggestion from "../skeletons/SkeletonSuggestion/SkeletonSuggestion";
import styles from "./Suggestions.module.css";

const Suggestions = () => {
  return (
    <Card>
      <div styleName="suggestions__text">
        <h2 styleName="suggestions__title">Suggestions For You</h2>
        <Link href="/friends#find" styleName="suggestions__link">
          See All
        </Link>
      </div>
      <SkeletonSuggestion />
      <div styleName="suggestions__suggestion">
        <div styleName="suggestions__user">
          <img
            styleName="suggestions__avatar"
            src="/images/optimistictrousers.jpg"
          />
          <p styleName="suggestions__subtitle">Sarah Tancredia</p>
        </div>
        <button styleName="suggestions__button suggestions__button--follow">
          Follow
        </button>
      </div>
      <div styleName="suggestions__suggestion">
        <div styleName="suggestions__user">
          <img
            styleName="suggestions__avatar"
            src="/images/optimistictrousers.jpg"
          />
          <p styleName="suggestions__subtitle">Aruthur Shelby</p>
        </div>
        <button styleName="suggestions__button suggestions__button--followed">
          Followed
        </button>
      </div>
      <div styleName="suggestions__suggestion">
        <div styleName="suggestions__user">
          <img
            styleName="suggestions__avatar"
            src="/images/optimistictrousers.jpg"
          />
          <p styleName="suggestions__subtitle">Vin Diesel</p>
        </div>
        <button styleName="suggestions__button suggestions__button--follow">
          Follow
        </button>
      </div>
    </Card>
  );
};

export default CSSModules(Suggestions, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
