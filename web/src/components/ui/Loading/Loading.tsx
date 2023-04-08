import CSSModules from "react-css-modules";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div styleName="loading">
      <div styleName="loading__dot"></div>
      <div styleName="loading__dot"></div>
      <div styleName="loading__dot"></div>
      <div styleName="loading__dot"></div>
      <div styleName="loading__dot"></div>
    </div>
  )
}

export default CSSModules(Loading, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore"
});