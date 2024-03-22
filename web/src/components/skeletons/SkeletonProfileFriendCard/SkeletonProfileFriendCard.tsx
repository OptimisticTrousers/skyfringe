import CSSModules from "react-css-modules";
import Shimmer from "../Shimmer";
import styles from "./SkeletonProfileFriendCard.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonProfileFriendCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName="profile__card">
      <div styleName="profile__container">
        <div styleName="profile__text">
          <div styleName="profile__subtitle" className={`skeleton skeleton--${theme}`}></div>
          <div styleName="profile__caption" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__link" className={`skeleton skeleton--${theme}`}></div>
      </div>
      <div styleName="profile__friends">
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className={`skeleton skeleton--${theme}`}></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className={`skeleton skeleton--${theme}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(SkeletonProfileFriendCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
