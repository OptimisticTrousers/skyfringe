import React from "react";
import CSSModules from "react-css-modules";
import styles from "../styles/Auth.module.css";

const Register = () => {
  const handleSubmit = () => {};

  return (
    <section styleName="auth">
      <h1 styleName="auth__title">Optimistic Facebook</h1>
      <h2 styleName="auth__subtitle">Think again asshole</h2>
      <form onSubmit={handleSubmit} styleName="auth__form">
        <div styleName="auth__control">
          <label htmlFor="email" styleName="auth__label">
            Bob Jones
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
            Bob Jones
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="1234"
            required
            styleName="auth__input"
          />
        </div>
        <button type="submit" styleName="auth__button">
          Log In
        </button>
      </form>
      <hr />
    </section>
  );
};

export default CSSModules(Register, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
