import { FC, useRef } from "react";
import CSSModules from "react-css-modules";
import { SkeletonComment, SkeletonPost } from "../../skeletons";
import { ErrorMessage } from "../../ui";
import Comment from "../Comment";
import styles from "./Comments.module.css";

interface Props {
  isCommentsOpen: boolean;
  comments: any;
  loading: any;
  error: any;
}

const Comments: FC<Props> = ({ isCommentsOpen, comments, loading, error }) => {
  const commentsRef = useRef<any>(null);
  console.log(loading)
  return (
    <section
      styleName="comments"
      data-testid="comments"
      ref={commentsRef}
      style={
        isCommentsOpen
          ? {
              maxHeight: "50vh",
              visibility: "visible",
              overflowY: "scroll",
            }
          : {
              maxHeight: "0px",
              visibility: "hidden",
            }
      }
    >
      {loading && (
        <>
          <SkeletonComment />
          <SkeletonComment />
          <SkeletonComment />
          <SkeletonComment />
          <SkeletonComment />
          <SkeletonComment />
          <SkeletonComment />
        </>
      )}
      {comments && (
        <div>
          {comments.map((comment: any) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </div>
      )}
      {error && <ErrorMessage message={error.message} />}
    </section>
  );
};

export default CSSModules(Comments, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
