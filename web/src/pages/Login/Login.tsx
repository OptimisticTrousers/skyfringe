import { FormEvent, useContext } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import { RxPerson } from "react-icons/rx";
import { ErrorMessage, PasswordContainer } from "../../components/ui";
import useLogin from "../../hooks/useLogin";
import useTestLogin from "../../hooks/useTestLogin";
import { AuthLayout } from "../../layouts";
import styles from "../../assets/Auth.module.css";
import useForm from "../../hooks/useForm";
import { FormError } from "@backend/types";
import { ToastContext } from "../../context/ToastContext";

const Login = () => {
  const { login, loading, formError } = useLogin();
  const { testLogin, loading: testLoading } = useTestLogin();
  const { showToast } = useContext(ToastContext);

  const {
    email,
    handleEmailChange,
    emailValid,
    emailError,
    password,
    handlePasswordChange,
    passwordValid,
    passwordError,
    passwordVisible,
    emailValidationStyles,
    passwordValidationStyles,
    checkPasswordValidation,
    checkEmailValidation,
    handlePasswordVisiblity,
  } = useForm();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailValid) {
      showToast("error", "Invalid email");
      return;
    } else if (!passwordValid) {
      showToast("error", "Invalid password");
      return;
    }
    login({ email, password });
  };

  const disabled = loading || testLoading;

  return (
    <AuthLayout handleSubmit={handleSubmit} title="Login">
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
          disabled={disabled}
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
            disabled={disabled}
            minLength={8}
            onChange={handlePasswordChange}
            onBlur={checkPasswordValidation}
          />
        </PasswordContainer>
        {passwordValid === false && <ErrorMessage message={passwordError} />}
      </div>
      <button
        type="submit"
        styleName="auth__button auth__button--submit"
        disabled={disabled}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
      <button styleName="auth__button auth__button--oauth" disabled={disabled}>
        <SiFacebook styleName="auth__icon auth__icon--facebook" />
        Continue with Facebook
      </button>
      <div styleName="auth__errors">
        {formError &&
          formError.map((error: FormError, index: number) => {
            return <ErrorMessage key={index} message={error.msg} />;
          })}
      </div>
      <div styleName="auth__divider auth__divider--horizontal">Or</div>
      <div styleName="auth__bottom">
        <button
          styleName="auth__button auth__button--guest"
          onClick={testLogin}
          disabled={disabled}
          type="button"
        >
          <RxPerson styleName="auth__icon auth__icon--guest" />
          {testLoading ? "Logging in..." : "Continue as guest"}
        </button>
        <Link
          to="/register"
          styleName="auth__button auth__button--create"
          aria-disabled={disabled}
        >
          Create new account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default CSSModules(Login, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
