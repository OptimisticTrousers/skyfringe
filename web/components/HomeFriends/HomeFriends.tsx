import React from "react";
import CSSModules from "react-css-modules";
import styles from "./HomeFriends.module.css";

const HomeFriends = () => {
  return (
    <div styleName="friends">
      <div styleName="friends__friend">
        <img src="/images/optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="/images/optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="/images/optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
      <div styleName="friends__friend">
        <img src="/images/optimistictrousers.jpg" styleName="friends__avatar" />
        <p styleName="friends__name">Amanda</p>
      </div>
    </div>
  );
};

export default CSSModules(HomeFriends, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
