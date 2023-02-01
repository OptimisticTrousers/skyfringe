import Link from "next/link";
import { useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";
import { SiFacebook } from "react-icons/si";
import styles from "../styles/Auth.module.css";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = () => {
    console.log("Bob Jones Locos Pollos");
  };

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
        <div styleName="auth__divider auth__divider--vertical">Register</div>
        <form onSubmit={handleSubmit} styleName="auth__form">
          <h2>Register</h2>
          <div styleName="auth__control">
            <label htmlFor="email" styleName="auth__label">
              <span styleName="auth__bold">First Name</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Bob"
              required
              styleName="auth__input"
            />
          </div>
          <div styleName="auth__control">
            <label htmlFor="email" styleName="auth__label">
              <span styleName="auth__bold">Last Name</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Jones"
              required
              styleName="auth__input"
            />
          </div>
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
            Create Account
          </button>
          <div styleName="auth__divider auth__divider--horizontal">Or</div>
          <div styleName="auth__bottom">
            <span styleName="auth__question">Already have an account?</span>
            <Link styleName="auth__link" href="/login">Log In</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CSSModules(Register, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
