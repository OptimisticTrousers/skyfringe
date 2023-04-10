import CSSModules from "react-css-modules";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Comments.module.css";
import Comment from "../Comment";
import { FC, useRef } from "react";

interface Props {
  isCommentsOpen: boolean;
}

const Comments: FC<Props> = ({ isCommentsOpen }) => {
  const commentsRef = useRef<any>(null);
  return (
    <section
      styleName="comments"
      data-testid="comments"
      ref={commentsRef}
      style={
        isCommentsOpen
          ? {
              maxHeight: "100vh",
            }
          : {
              maxHeight: "0px",
            }
      }
    >
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </section>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
