import CSSModules from "react-css-modules";
import styles from "./Shimmer.module.css";

// Used in skeleton loaders to add well... a shimmer effect! Must add to all skeleton loaders
const Shimmer = () => {
  return (
    <div styleName="shimmer">
      <div styleName="shimmer__inner"></div>
    </div>
  );
};

export default CSSModules(Shimmer, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
