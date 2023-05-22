import CSSModules from "react-css-modules";
import Shimmer from "../Shimmer";
import styles from "./SkeletonProfileFriendCard.module.css";

const SkeletonProfileFriendCard = () => {
  return (
    <div styleName="profile__card">
      <div styleName="profile__container">
        <div styleName="profile__text">
          <div styleName="profile__subtitle" className="skeleton"></div>
          <div styleName="profile__caption" className="skeleton"></div>
        </div>
        <div styleName="profile__link" className="skeleton"></div>
      </div>
      <div styleName="profile__friends">
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
        <div styleName="profile__friend">
          <div styleName="profile__content">
            <div styleName="profile__avatar" className="skeleton"></div>
            <Shimmer />
          </div>
          <div styleName="profile__name" className="skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(SkeletonProfileFriendCard, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
