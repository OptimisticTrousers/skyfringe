import { FormError } from "@backend/types";
import { FormEvent } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import {
  ErrorMessage,
  PasswordContainer,
  PasswordStrengthMeter,
} from "../../components/ui";
import useForm from "../../hooks/useForm";
import useRegister from "../../hooks/useRegister";
import { AuthLayout } from "../../layouts";
import styles from "./Register.module.css";

const Register = () => {
  const { register, loading, formError } = useRegister();

  const {
    fullName,
    handleFullNameChange,
    userName,
    handleUserNameChange,
    userNameValid,
    userNameError,
    email,
    handleEmailChange,
    emailValid,
    emailError,
    password,
    handlePasswordChange,
    passwordValid,
    passwordError,
    passwordVisible,
    passwordConf,
    handlePasswordConfChange,
    passwordConfValid,
    passwordConfError,
    emailValidationStyles,
    userNameValidationStyles,
    passwordValidationStyles,
    checkPasswordConfValidation,
    checkPasswordValidation,
    checkUserNameValidation,
    checkEmailValidation,
    handlePasswordVisiblity,
  } = useForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(emailValid && passwordValid && passwordConf && userNameValid)) return;
    register({ email, password, fullName, userName, passwordConf });
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
          styleName="auth__input"
          value={fullName}
          disabled={loading}
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
          onChange={handleUserNameChange}
          pattern="^[a-z\d\.]{5,}$"
          onBlur={checkUserNameValidation}
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
        <Link styleName="auth__link" to="/login">
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
