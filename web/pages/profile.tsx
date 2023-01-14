import React from "react";
import CSSModules from "react-css-modules";
import Card from "../components/Card/Card";
import Post from "../components/Post/Post";
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
            <div styleName="profile__card">
              <h3 styleName="profile__subtitle">About</h3>
              <p styleName="profile__description">
                Hi! My name is Samantha Nelson, I'm a creative geek from Prague.
                I enjoy creating eye canday solutions for web and mobile apps
              </p>
            </div>
          </Card>
          <Card>
            <div styleName="profile__card">
              <h3 styleName="profile__subtitle">Media</h3>
              <div styleName="profile__friends">
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
              </div>
            </div>
          </Card>
          <Card>
            <div styleName="profile__card">
              <div styleName="profile__container">
                <div styleName="profile__text">
                  <h3 styleName="profile__subtitle">Friends</h3>
                  <p styleName="profile__caption">10 friends</p>
                </div>
                <a styleName="profile__link">See all friends</a>
              </div>
              <div styleName="profile__friends">
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
                <img src="optimistictrousers.jpg" styleName="profile__friend" />
              </div>
            </div>
          </Card>
        </aside>
        <div styleName="profile__main">
          <ul styleName="profile__list">
            <li styleName="profile__item">
              Friends
            </li>
            <li styleName="profile__item">
              Your posts
            </li>
            <li styleName="profile__item">
              Liked posts
            </li>
            <li styleName="profile__item">
              Saved posts
            </li>
          </ul>
          <div styleName="profile__posts">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Profile, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
