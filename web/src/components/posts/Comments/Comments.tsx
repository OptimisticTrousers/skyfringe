import { FC, useRef } from "react";
import CSSModules from "react-css-modules";
import Comment from "../Comment";
import styles from "./Comments.module.css";

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
              visibility: "visible"
            }
          : {
              maxHeight: "0px",
              visibility: "hidden"
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
