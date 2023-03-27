import { FC, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Aside } from "./components/common";
import { Outlet } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <div styleName="container">
        <Aside />
        <main styleName="main">
          <Outlet />
        </main>
      </div>
      <footer></footer>
    </>
  );
};

export default CSSModules(App, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
});
