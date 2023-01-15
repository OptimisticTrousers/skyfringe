import React from "react";
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "../Friends/Friends.module.css";

const FriendRequestsSent = () => {
  return (
    <div styleName="friend">
      <Card>
        <h2 styleName="friend__title">Friend Requests Sent</h2>
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img src="optimistictrousers.jpg" styleName="friend__avatar" />
            <p styleName="friend__name">Bob Jones</p>
          </div>
        </div>
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img src="optimistictrousers.jpg" styleName="friend__avatar" />
            <p styleName="friend__name">Bob Jones</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(FriendRequestsSent, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
