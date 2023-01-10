import React, { useState } from "react";
import CSSModules from "react-css-modules";
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
      <h2 styleName="auth__subtitle">Register</h2>
      <form onSubmit={handleSubmit} styleName="auth__form">
        <div styleName="auth__control">
          <label htmlFor="email" styleName="auth__label">
            First Name
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
          <label htmlFor="email" styleName="auth__label">
            Last Name
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
          <label htmlFor="email" styleName="auth__label">
            Email
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
            Password
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
                <img
                  src="/svgs/invisible.svg"
                  alt="crossed out eye"
                  styleName="auth__icon"
                />
              </div>
            ) : (
              <div
                styleName="auth__container"
                onClick={handlePasswordVisiblity}
              >
                <img
                  src="/svgs/visible.svg"
                  alt="open eye"
                  styleName="auth__icon"
                />
              </div>
            )}
          </div>
        </div>
        <button type="submit" styleName="auth__button">
          Register
        </button>
      </form>
    </section>
  );
};

export default CSSModules(Register, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
