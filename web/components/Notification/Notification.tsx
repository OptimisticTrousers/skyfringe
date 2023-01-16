import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Notification.module.css";

const Notification = () => {
  return (
    <div styleName="notification__activity">
      <div styleName="notification__flex">
        <img
          src="/images/optimistictrousers.jpg"
          styleName="notification__avatar"
        />
        <div styleName="notification__details">
          <h3 styleName="notification__name">Vitaliy Akterskiy</h3>
          <p styleName="notification__event">
            on your post
            <span styleName="notification__time">• 3 min ago</span>
          </p>
        </div>
      </div>
      <button styleName="notification__button">View Post</button>
    </div>
  );
};

export default CSSModules(Notification, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
