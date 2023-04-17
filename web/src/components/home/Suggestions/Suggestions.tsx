import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { SkeletonSuggestion } from "../../skeletons";
import { Card } from "../../ui";
import styles from "./Suggestions.module.css";

const Suggestions = () => {
  return (
    <Card>
      <div styleName="suggestions__text">
        <h2 styleName="suggestions__title">Suggestions For You</h2>
        <Link to="/friends#find" styleName="suggestions__link">
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
