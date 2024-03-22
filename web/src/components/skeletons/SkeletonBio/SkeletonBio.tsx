import CSSModules from "react-css-modules";
import styles from "./SkeletonBio.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SkeletonBio = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div styleName="skeleton" className={`skeleton skeleton--${theme}`}></div>
      <div styleName="skeleton" className={`skeleton skeleton--${theme}`}></div>
      <div styleName="skeleton" className={`skeleton skeleton--${theme}`}></div>
      <div styleName="skeleton" className={`skeleton skeleton--${theme}`}></div>
    </>
  );
};

export default CSSModules(SkeletonBio, styles, {
  allowMultiple: true,

  handleNotFoundStyleName: "ignore",
});
