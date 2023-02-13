import { ChangeEvent, FormEvent, useState } from "react";
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

  const [emailValidationStyles, setEmailValidationStyles] = useState(false);
  const [passwordValidationStyles, setPasswordValidationStyles] =
    useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setEmailValid(true);
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const checkEmailValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setEmailValidationStyles(true);
      setEmailValid(false);
      setEmailError("The email field must be a valid email");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setPasswordValid(true);
      setPasswordError("");
    }
    setPassword(e.target.value);
  };

  const checkPasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setPasswordValidationStyles(true);
      setPasswordValid(false);
      setPasswordError("The password field must be at least 8 characters");
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
          styleName={`auth__input ${
            emailValidationStyles ? "auth__input--validation" : ""
          }`}
          value={email}
          required
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
            styleName={`auth__input ${
              passwordValidationStyles ? "auth__input--validation" : ""
            }`}
            required
            value={password}
            minLength={8}
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
