import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import Logo from "../../components/ui/Logo/Logo";
import styles from "../styles/Error.module.css";

const Custom404 = () => (
  <div styleName="not-found">
    <div styleName="not-found__container">
      <Logo type="lg" />
      <h2 styleName="not-found__number">404</h2>
      <hr styleName="not-found__break" />
      <p styleName="not-found__error">Page Not Found</p>
      <Link styleName="not-found__link" to="/">
        Go back to the home page
      </Link>
    </div>
  </div>
);

export default CSSModules(Custom404, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
