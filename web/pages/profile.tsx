import React from "react";
import CSSModules from "react-css-modules";
import Card from "../components/Card/Card";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  return (
    <div styleName="profile">
      <header styleName="profile__header">
        <img src="optimistictrousers.jpg" styleName="profile__image" />
        <div styleName="profile__details">
          <img src="optimistictrousers.jpg" styleName="profile__avatar" />
          <div styleName="profile__text">
            <h2 styleName="profile__name">Samantha Nelson</h2>
            <p>Product designer</p>
          </div>
        </div>
      </header>
      <div styleName="profile__content">
        <aside styleName="profile__aside">
          <Card>
            <h3 styleName="profile__subtitle">About</h3>
            <p styleName="profile__description">
              Hi! My name is Samantha Nelson, I'm a creative geek from Prague. I
              enjoy creating eye canday solutions for web and mobile apps
            </p>
          </Card>
        </aside>
        <div styleName="profile__posts">

        </div>
      </div>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
