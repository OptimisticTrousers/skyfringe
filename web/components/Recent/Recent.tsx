import React from "react";
import CSSModules from "react-css-modules";
import Card from "../Card/Card";
import styles from "./Recent.module.css";

const Recent = () => {
  return (
    <Card>
      <h2 styleName="recent__title">Recent activity</h2>
      <div styleName="recent__activity">
        <div styleName="recent__flex">
          <img
            src="/images/optimistictrousers.jpg"
            styleName="recent__avatar"
          />
          <div styleName="recent__details">
            <h3 styleName="recent__name">Vitaliy Akterskiy</h3>
            <p styleName="recent__event">
              on your post
              <span styleName="recent__time">• 3 min ago</span>
            </p>
          </div>
        </div>
        <button styleName="recent__button">View Post</button>
      </div>
    </Card>
  );
};

export default CSSModules(Recent, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
