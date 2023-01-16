import React from "react";
import CSSModules from "react-css-modules";
import Card from "../components/Card/Card";
import styles from "../styles/Settings.module.css";

const Settings = () => {
  return (
    <div styleName="settings">
      <header styleName="settings__header">
        <button styleName="settings__button settings__button--banner">
          Change Cover
        </button>
        <img
          src="/images/optimistictrousers.jpg"
          styleName="settings__banner"
        />
      </header>
      <div styleName="settings__grid">
        <aside styleName="settings__aside">
          <Card>
            <div styleName="settings__card">
              <img
                src="/images/optimistictrousers.jpg"
                styleName="settings__avatar"
              />
              <h2 styleName="settings__name">Nathaniel Poole</h2>
              <p styleName="settings__friends">10 friends</p>
            </div>
            <div styleName="settings__box">
              <p styleName="settings__statistic">Posts created</p>
              <p styleName="settings__number settings__number--orange">32</p>
            </div>
            <div styleName="settings__box">
              <p styleName="settings__statistic">Posts liked</p>
              <p styleName="settings__number settings__number--green">32</p>
            </div>
            <div styleName="settings__box">
              <p styleName="settings__statistic">Comments</p>
              <p styleName="settings__number settings__number--gray">32</p>
            </div>
            <div styleName="settings__box">
              <button styleName="settings__button settings__button--view">
                View Public Profile
              </button>
            </div>
          </Card>
          <Card>
            <h3 styleName="settings__subtitle">Close account</h3>
            <p styleName="settings__description">
              By deleting your account, you will lose all of your data. This
              action cannot be reversed.
            </p>
            <button styleName="settings__button--delete">Close Account</button>
          </Card>
        </aside>
        <div styleName="settings__content">
          <Card>
            <h2 styleName="settings__title">Account Settings</h2>
            <form styleName="settings__form">
              <div styleName="settings__group">
                <label htmlFor="firstName" styleName="settings__label">
                  First Name
                </label>
                <input
                  styleName="settings__input"
                  id="firstName"
                  name="firstName"
                />
              </div>
              <div styleName="settings__group">
                <label htmlFor="lastName" styleName="settings__label">
                  Last Name
                </label>
                <input
                  styleName="settings__input"
                  id="lastName"
                  name="lastName"
                />
              </div>
              <div styleName="settings__group">
                <label htmlFor="email" styleName="settings__label">
                  Email
                </label>
                <input
                  styleName="settings__input"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
            </form>
            <div styleName="settings__box">
              <button styleName="settings__button--update">Update</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Settings, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
