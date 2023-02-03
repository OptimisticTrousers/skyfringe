import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Comments.module.css";
import Comment from "../Comment";

const Comments = () => {
  return (
    <section styleName="comments" data-testid="comments">
      <div styleName="comments__form">
        <img
          src="/images/optimistictrousers.jpg"
          styleName="comments__avatar comments__avatar--comments"
        />
        <input styleName="comments__input" placeholder="What's on your mind?" />
      </div>
      <p styleName="comments__text">
        <span styleName="comments__all">
          All comments
          <IoIosArrowDown styleName="comments__icon comments__icon--arrow" />
        </span>
        {/* <span styleName="comments__filter">
          <span styleName="comments__gray">Sort by</span>
          Most popular
        </span> */}
      </p>
      <Comment />
    </section>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
