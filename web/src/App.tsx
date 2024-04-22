import CSSModules from "react-css-modules";
import { Outlet } from "react-router-dom";
import styles from "./assets/App.module.css";
import { Aside } from "./layouts";
import LoadingScreen from "./pages/LoadingScreen";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div styleName={`container container--${theme}`}>
        <Aside />
        <main styleName="main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default CSSModules(App, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
