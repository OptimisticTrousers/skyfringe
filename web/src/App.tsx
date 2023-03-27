import CSSModules from "react-css-modules";
import { Outlet } from "react-router-dom";
import { Aside } from "./components/common";
import styles from "./assets/App.module.css";
import { useContext, useEffect } from "react";
import { ToastContext } from "./context/ToastContext";
import { Toast } from "./components/ui";

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
  handleNotFoundStyleName: "ignore",
});
