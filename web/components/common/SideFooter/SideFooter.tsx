import CSSModules from "react-css-modules";
import Link from "next/link";
import { FaGithubSquare } from "react-icons/fa";
import Card from "../../ui/Card";
import styles from "./SideFooter.module.css";

const SideFooter = () => {
  return (
    <footer styleName="footer">
      <Card>
        <h2 styleName="footer__name">Skyfringe</h2>
        <p styleName="footer__copyright">© Tony Isern 2023</p>
        <Link href="/">
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
