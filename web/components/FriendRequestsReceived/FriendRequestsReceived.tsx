import React from "react";
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "../../styles/Friends.module.css";

const FriendRequestsReceived = () => {
  return (
    <div styleName="friend">
      <Card>
        <h2 styleName="friend__title">Friend Requests Received</h2>
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img
              src="/images/optimistictrousers.jpg"
              styleName="friend__avatar"
            />
            <p styleName="friend__name">Bob Jones</p>
          </div>
          <button styleName="friend__button">Accept</button>
        </div>
        <div styleName="friend__flex">
          <div styleName="friend__details">
            <img
              src="/images/optimistictrousers.jpg"
              styleName="friend__avatar"
            />
            <p styleName="friend__name">Bob Jones</p>
          </div>
          <button styleName="friend__button">Accept</button>
        </div>
      </Card>
    </div>
  );
};

export default CSSModules(FriendRequestsReceived, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
