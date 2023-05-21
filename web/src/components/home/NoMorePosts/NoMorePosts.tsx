import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { Card } from "../../ui";
import styles from "./NoMorePosts.module.css";

const NoMorePosts = () => {
  return (
    <Card>
      <div styleName="container">
        <p styleName="container__title">No more posts</p>
        <p styleName="container__description">
          Add more friends to see more posts in your Feed.
        </p>
        <Link styleName="container__link" to="/friends">
          Find Friends
        </Link>
      </div>
    </Card>
  );
};

export default CSSModules(NoMorePosts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
