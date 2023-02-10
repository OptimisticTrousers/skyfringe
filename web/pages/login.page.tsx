import { ChangeEvent, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { RxPerson } from "react-icons/rx";
import styles from "../styles/Auth.module.css";
import Link from "next/link";
import Logo from "../components/ui/Logo/Logo";
import { PasswordContainer } from "../components/ui/PasswordContainer";
import AuthLayout from "../components/common/AuthLayout";
import { ErrorMessage } from "../components/ui/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = () => {};

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setEmailValid(true);
      setEmailError("");
    }
  };

  const checkEmailValidation = () => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (email === "" || email === "null" || email === null) {
      setEmailValid(false);
      setEmailError("Input is required.");
    } else if (!emailRegex.test(email)) {
      setEmailValid(false);
      setEmailError("Input is not a valid email-address.");
    } else {
      setEmailValid(true);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordValid(true);
      setPasswordError("");
    }
  };

  const checkPasswordValidation = () => {
    // Password must be at least 8 characters
    if (password.length === 0) {
      setPasswordValid(false);
      setPasswordError(`Input is required.`);
    } else if (password.length < 8) {
      setPasswordValid(false);
      setPasswordError("Input must be at least 8 characters long.");
    } else {
      setPasswordValid(true);
      setPasswordError("");
    }
  };

  const handlePasswordVisiblity = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <AuthLayout handleSubmit={handleSubmit}>
      <h2 styleName="auth__title">Log In</h2>
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
          value={email}
          onChange={handleEmailChange}
          onBlur={checkEmailValidation}
        />
        {emailValid === false && <ErrorMessage message={emailError} />}
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
            value={password}
            onChange={handlePasswordChange}
            onBlur={checkPasswordValidation}
          />
        </PasswordContainer>
        {passwordValid === false && <ErrorMessage message={passwordError} />}
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
        <Link href="/register" styleName="auth__button auth__button--create">
          Create new account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default CSSModules(Login, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
