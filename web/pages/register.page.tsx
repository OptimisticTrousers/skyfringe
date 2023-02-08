import { useState } from "react";
import CSSModules from "react-css-modules";
import Link from "next/link";
import AuthLayout from "../components/common/AuthLayout";
import { PasswordContainer } from "../components/ui/PasswordContainer";
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
    <AuthLayout handleSubmit={handleSubmit}>
      <h2 styleName="auth__title">Register</h2>
      <div styleName="auth__control">
        <label htmlFor="email" styleName="auth__label">
          <span styleName="auth__bold">First Name</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          styleName="auth__input"
        />
        <p styleName="auth__message">
          Your first name will be used for your display avatar
        </p>
      </div>
      <div styleName="auth__control">
        <label htmlFor="email" styleName="auth__label">
          <span styleName="auth__bold">Last Name</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          styleName="auth__input"
        />
      </div>
      <div styleName="auth__control">
        <label htmlFor="email" styleName="auth__label">
          <span styleName="auth__bold">Email Address</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          styleName="auth__input"
        />
        <p styleName="auth__message">
          You'll use your email address to log in.
        </p>
      </div>
      <div styleName="auth__control">
        <PasswordContainer
          showPassword={passwordVisible}
          handleClick={handlePasswordVisiblity}
        >
          <label htmlFor="password" styleName="auth__label">
            <span styleName="auth__bold">Password</span>
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            required
            styleName="auth__input"
          />
        </PasswordContainer>
      </div>
      <div styleName="auth__control">
        <PasswordContainer
          showPassword={passwordVisible}
          handleClick={handlePasswordVisiblity}
        >
          <label htmlFor="password" styleName="auth__label">
            <span styleName="auth__bold">Confirm Password</span>
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            required
            styleName="auth__input"
          />
        </PasswordContainer>
      </div>
      <button type="submit" styleName="auth__button auth__button--submit">
        Create Account
      </button>
      <div styleName="auth__divider auth__divider--horizontal">Or</div>
      <div styleName="auth__bottom">
        <span styleName="auth__question">Already have an account?</span>
        <Link styleName="auth__link" href="/login">
          Log In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default CSSModules(Register, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
