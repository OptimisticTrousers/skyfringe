import { useContext } from "react";
import CSSModules from "react-css-modules";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./Welcome.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

const Welcome = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  return (
    <div styleName={`welcome welcome--${theme}`}>
      <img
        styleName="welcome__image"
        src={"/images/robot.gif"}
        alt="waving robot"
      />
      <h1 styleName="welcome__title">
        Welcome, <span styleName="welcome__username">{user.fullName}</span>
      </h1>
      <h3 styleName="welcome__description">
        Please select a chat to start messaging.
      </h3>
    </div>
  );
};

export default CSSModules(Welcome, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
