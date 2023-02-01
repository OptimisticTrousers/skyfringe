import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { SiFacebook } from "react-icons/si";
import styles from "./AuthLayout.module.css";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const AuthLayout: FC<Props> = ({ children }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = () => {};

  const handlePasswordVisiblity = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };
  return (
    <section styleName="auth">
      <div styleName="auth__box">
        <div styleName="auth__hero">
          <h1 styleName="auth__logo">
            <img
              styleName="auth__image"
              src="/svgs/logo.svg"
              alt="circular lightning bolt surrounded by a blue circle"
            />
            Skyfringe
          </h1>
          <p styleName="auth__description">A place to meet friends</p>
        </div>
        <div styleName="auth__divider auth__divider--vertical">Login</div>
        <form onSubmit={handleSubmit} styleName="auth__form">
          <h2>Log In</h2>
          <div styleName="auth__control">
            <label htmlFor="email" styleName="auth__label">
              <span styleName="auth__bold">Email Address</span> (required)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              styleName="auth__input"
            />
          </div>
          <div styleName="auth__control">
            <label htmlFor="password" styleName="auth__label">
              <span styleName="auth__bold">Password</span> (required)
            </label>
            <div styleName="auth__flex">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="1234"
                required
                styleName="auth__input"
              />
              {passwordVisible ? (
                <div
                  styleName="auth__container"
                  onClick={handlePasswordVisiblity}
                >
                  <AiOutlineEye styleName="auth__icon auth__icon--password" />
                </div>
              ) : (
                <div
                  styleName="auth__container"
                  onClick={handlePasswordVisiblity}
                >
                  <AiOutlineEyeInvisible styleName="auth__icon auth__icon--password" />
                </div>
              )}
            </div>
          </div>
          <button type="submit" styleName="auth__button auth__button--submit">
            Log In
          </button>
          <button styleName="auth__button auth__button--oauth">
            <SiFacebook styleName="auth__icon auth__icon--facebook" />
            Continue with Facebook
          </button>
          <div styleName="auth__divider auth__divider--horizontal">Or</div>
          <div styleName="auth__bottom">
            <button styleName="auth__button auth__button--guest">
              <RxPerson styleName="auth__icon auth__icon--guest" />
              Continue as guest
            </button>
            <button styleName="auth__button auth__button--create">
              Create new account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CSSModules(AuthLayout, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
