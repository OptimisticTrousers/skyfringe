import CSSModules from "react-css-modules";
import { Outlet } from "react-router-dom";
import styles from "./assets/App.module.css";
import { Aside } from "./layouts";

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
