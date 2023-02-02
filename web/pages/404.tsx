import Link from "next/link";
import CSSModules from "react-css-modules";
import Logo from "../components/ui/Logo/Logo";
import styles from "../styles/404.module.css";

const Custom404 = () => (
  <div styleName="not-found">
    <Logo type="lg" />
    <h2 styleName="not-found__number">404</h2>
    <p styleName="not-found__error">Page Not Found</p>
    <Link styleName="not-found__link" href="/">
      Go back to the home page
    </Link>
  </div>
);

export default CSSModules(Custom404, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
