import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { Card } from "../../ui";
import styles from "./FinishedPosts.module.css";

const NoMorePosts = () => {
  return (
    <Card>
      <div styleName="container">
        <p styleName="container__title">No more posts</p>
      </div>
    </Card>
  );
};

export default CSSModules(NoMorePosts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
