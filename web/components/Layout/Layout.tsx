import React, { FC } from "react";
import CSSModules from "react-css-modules";
import Aside from "../Aside/Aside";
import styles from "./Layout.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div styleName="container">
        <Aside />
        <main styleName="main">{children}</main>
      </div>
      <footer></footer>
    </>
  );
};

export default CSSModules(Layout, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
