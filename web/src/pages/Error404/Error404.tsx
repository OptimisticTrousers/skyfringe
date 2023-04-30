import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { Logo } from "../../components/ui";
import styles from "../../assets/Error.module.css";

const Custom404 = () => {
  return (
    <div styleName="error">
      <div styleName="error__container">
        <Logo type="lg" />
        <h2 styleName="error__number">404</h2>
        <hr styleName="error__break" />
        <p styleName="error__message">Page Not Found</p>
        <Link styleName="error__link" to="/">
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default CSSModules(Custom404, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
