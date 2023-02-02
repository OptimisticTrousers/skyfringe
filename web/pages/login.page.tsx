import Image from "next/image";
import { ChangeEvent, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { RxPerson } from "react-icons/rx";
import styles from "../styles/Auth.module.css";
import Link from "next/link";
import Logo from "../components/ui/Logo/Logo";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {};

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    setEmail(e.target.value)
    if(emailRegex.test(e.target.value)) {
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if(e.target.value.length >= 8) {
      
    }
  }

  const handlePasswordVisiblity = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <section styleName="auth">
      <div styleName="auth__box">
        <div styleName="auth__hero">
          <Logo type="lg" />
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
                <button
                  styleName="auth__container"
                  type="button"
                  aria-pressed={true}
                  onClick={handlePasswordVisiblity}
                >
                  <AiOutlineEye styleName="auth__icon auth__icon--password" />
                </button>
              ) : (
                <button
                  styleName="auth__container"
                  type="button"
                  aria-pressed={false}
                  onClick={handlePasswordVisiblity}
                >
                  <AiOutlineEyeInvisible styleName="auth__icon auth__icon--password" />
                </button>
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
            <Link
              href="/register"
              styleName="auth__button auth__button--create"
            >
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CSSModules(Login, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});