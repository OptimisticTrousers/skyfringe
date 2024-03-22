import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { Card } from "../../ui";
import styles from "./FinishedPosts.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const NoMorePosts = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Card>
      <div styleName="container">
        <p styleName={`container__title container__title--${theme}`}>No more posts</p>
      </div>
    </Card>
  );
};

export default CSSModules(NoMorePosts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
