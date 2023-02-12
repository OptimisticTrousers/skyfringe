import { ChangeEvent, useState } from "react";
import CSSModules from "react-css-modules";
import Link from "next/link";
import AuthLayout from "../components/common/AuthLayout";
import { PasswordContainer } from "../components/ui/PasswordContainer";
import styles from "../styles/Auth.module.css";
import { PasswordStrengthMeter } from "../components/ui/PasswordStrengthMeter";
import { ErrorMessage } from "../components/ui/ErrorMessage";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [passwordConf, setPasswordConf] = useState("");
  const [passwordConfValid, setPasswordConfValid] = useState(true);
  const [passwordConfError, setPasswordConfError] = useState("");

  const [emailValidationStyles, setEmailValidationStyles] = useState(false);
  const [passwordValidationStyles, setPasswordValidationStyles] =
    useState(false);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setEmailValid(true);
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordConfChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConf(e.target.value);
  };

  const checkPasswordConfValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      password === passwordConf &&
      password.length > 0 &&
      passwordConf.length > 0
    ) {
      setPasswordConfValid(true);
    } else if (password !== passwordConf && passwordConf.length > 0) {
      setPasswordConfValid(false);
      setPasswordConfError("Passwords do not match");
    }
  };

  const checkEmailValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setEmailValidationStyles(true);
      setEmailValid(false);
      setEmailError("The email field must be a valid email");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
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
          value={firstName}
          onChange={handleFirstNameChange}
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
          value={lastName}
          onChange={handleLastNameChange}
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
          styleName={`auth__input ${
            emailValidationStyles && "auth__input--validation"
          }`}
          onChange={handleEmailChange}
          onBlur={checkEmailValidation}
          value={email}
        />
        {emailValid === false && <ErrorMessage message={emailError} />}
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
            styleName={`auth__input ${
              passwordValidationStyles && "auth__input--validation"
            }`}
            value={password}
            minLength={8}
            onChange={handlePasswordChange}
            onBlur={checkPasswordValidation}
          />
        </PasswordContainer>
        {passwordValid === false && <ErrorMessage message={passwordError} />}
        <PasswordStrengthMeter password={password} />
        <p styleName="auth__message">
          <span styleName="auth__bold">Important:</span> Master passwords cannot
          be recovered if you forget it!
        </p>
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
            value={passwordConf}
            onChange={handlePasswordConfChange}
            onBlur={checkPasswordConfValidation}
          />
        </PasswordContainer>
        {passwordConfValid === false && (
          <ErrorMessage message={passwordConfError} />
        )}
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
