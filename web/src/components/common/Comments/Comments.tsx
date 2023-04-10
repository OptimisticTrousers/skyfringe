import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Comments.module.css";
import Comment from "../Comment";

const Comments = () => {
  return (
    <section styleName="comments" data-testid="comments">
    </section>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
