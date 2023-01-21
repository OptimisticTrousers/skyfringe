import Link from "next/link";
import React from "react";
import CSSModules from "react-css-modules";
import styles from "./SideFooter.module.css";
import { FaGithubSquare } from "react-icons/fa";
import Card from "../Card/Card";

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
