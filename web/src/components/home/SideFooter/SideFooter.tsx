import CSSModules from "react-css-modules";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card } from "../../ui";
import styles from "./SideFooter.module.css";

const SideFooter = () => {
  return (
    <footer styleName="footer">
      <Card>
        <h2 styleName="footer__name">Skyfringe</h2>
        <Link styleName="footer__link" to="/privacy">
          Privacy Policy
        </Link>
        <p styleName="footer__copyright">© Tony Isern 2023</p>
        <Link to="https://github.com/OptimisticTrousers?tab=repositories">
          <FaGithubSquare styleName="footer__icon" />
        </Link>
      </Card>
    </footer>
  );
};

export default CSSModules(SideFooter, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
