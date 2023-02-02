import CSSModules from "react-css-modules";
import Link from "next/link";
import Logo from "../components/ui/Logo/Logo";
import styles from "../styles/Error.module.css";

const Custom500 = () => {
  return (
    <div styleName="not-found">
      <div styleName="not-found__container">
        <Logo type="lg" />
        <h2 styleName="not-found__number">500</h2>
        <hr styleName="not-found__break" />
        <p styleName="not-found__error">500 Internal Server Error</p>
        <Link styleName="not-found__link" href="/">
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default CSSModules(Custom500, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
