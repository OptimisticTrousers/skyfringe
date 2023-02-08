import { FC } from "react";
import CSSModules from "react-css-modules";
import Logo from "../../ui/Logo/Logo";
import styles from "./AuthLayout.module.css";

interface Props {
  children: JSX.Element[] | JSX.Element;
  handleSubmit: any;
}

const AuthLayout: FC<Props> = ({ children, handleSubmit }) => {
  return (
    <section styleName="auth">
      <div styleName="auth__box">
        <div styleName="auth__hero">
          <Logo type="lg" />
          <p styleName="auth__description">A place to meet friends</p>
        </div>
        <div styleName="auth__divider auth__divider--vertical">Login</div>
        <form onSubmit={handleSubmit} styleName="auth__form">
          {children}
        </form>
      </div>
    </section>
  );
};

export default CSSModules(AuthLayout, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
