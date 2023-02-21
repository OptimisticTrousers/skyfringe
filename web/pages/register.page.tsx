import { ChangeEvent, FormEvent, useState } from "react";
import CSSModules from "react-css-modules";
import Link from "next/link";
import AuthLayout from "../components/common/AuthLayout";
import { PasswordContainer } from "../components/ui/PasswordContainer";
import styles from "../styles/Auth.module.css";
import { PasswordStrengthMeter } from "../components/ui/PasswordStrengthMeter";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import useRegister from "../hooks/useRegister";
import useErrorToast from "../hooks/useErrorToast";
import { FormError } from "../types";

const Register = () => {
  const { register, loading, error, formError } = useRegister();

  // All non-form validation errors
  useErrorToast(error, error ? error.message : "");

  const [fullName, setFullName] = useState("");

  const [userName, setuserName] = useState("");
  const [userNameValid, setuserNameValid] = useState(true);
  const [userNameError, setuserNameError] = useState("");

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
  const [userNameValidationStyles, setuserNameValidationStyles] =
    useState(false);
  const [passwordValidationStyles, setPasswordValidationStyles] =
    useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(emailValid && passwordValid && passwordConf && userNameValid)) return;
    register({ email, password, fullName, userName, passwordConf });
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleuserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setuserNameValid(true);
      setuserNameError("");
    }
    setuserName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setEmailValid(true);
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordConfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (password === passwordConf && e.target.checkValidity()) {
      setPasswordConfValid(true);
      setPasswordConfError("");
    }
    setPasswordConf(e.target.value);
  };

  const checkPasswordConfValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (password !== passwordConf || !e.target.checkValidity()) {
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

  const checkuserNameValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setuserNameValidationStyles(true);
      setuserNameValid(false);
      setuserNameError("No spaces, uppercase letters, or special characters");
    }
  };

  const handlePasswordVisiblity = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <AuthLayout handleSubmit={handleSubmit} title="Register">
      <h2 styleName="auth__title">Register</h2>
      <div styleName="auth__control">
        <label htmlFor="fullName" styleName="auth__label">
          <span styleName="auth__bold">Full Name</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          disabled={loading}
          styleName="auth__input"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <p styleName="auth__message">
          Your first name will be used for your display avatar
        </p>
      </div>
      <div styleName="auth__control">
        <label htmlFor="username" styleName="auth__label">
          <span styleName="auth__bold">Username</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          disabled={loading}
          required
          styleName={`auth__input ${
            userNameValidationStyles ? "auth__input--validation" : ""
          }`}
          value={userName}
          onChange={handleuserNameChange}
          pattern="^[a-z\d\.]{5,}$"
          onBlur={checkuserNameValidation}
        />
        {userNameValid === false && <ErrorMessage message={userNameError} />}
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
          disabled={loading}
          styleName={`auth__input ${
            emailValidationStyles ? "auth__input--validation" : ""
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
              passwordValidationStyles ? "auth__input--validation" : ""
            }`}
            value={password}
            minLength={8}
            disabled={loading}
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
          <label htmlFor="confirmPassword" styleName="auth__label">
            <span styleName="auth__bold">Confirm Password</span>
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            required
            styleName="auth__input"
            minLength={8}
            value={passwordConf}
            onChange={handlePasswordConfChange}
            disabled={loading}
            onBlur={checkPasswordConfValidation}
          />
        </PasswordContainer>
        {passwordConfValid === false && (
          <ErrorMessage message={passwordConfError} />
        )}
      </div>
      <button
        type="submit"
        styleName="auth__button auth__button--submit"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
      <div styleName="auth__errors">
        {formError &&
          formError.map((error: FormError, index: number) => {
            return <ErrorMessage key={index} message={error.msg} />;
          })}
      </div>
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
