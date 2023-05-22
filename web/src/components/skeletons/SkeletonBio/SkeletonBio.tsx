import CSSModules from "react-css-modules";
import styles from "./SkeletonBio.module.css";

const SkeletonBio = () => {
  return (
    <>
      <div styleName="skeleton" className="skeleton"></div>
      <div styleName="skeleton" className="skeleton"></div>
      <div styleName="skeleton" className="skeleton"></div>
      <div styleName="skeleton" className="skeleton"></div>
    </>
  );
};

export default CSSModules(SkeletonBio, styles, {
  allowMultiple: true,

  handleNotFoundStyleName: "ignore",
});
