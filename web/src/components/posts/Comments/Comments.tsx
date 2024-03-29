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
  deleteLocalComment: any;
  editLocalComment: any;
}

const Comments: FC<Props> = ({ isCommentsOpen, comments, loading, error, deleteLocalComment, editLocalComment }) => {
  const commentsRef = useRef<any>(null);
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
            overflowY: "scroll"
          }
          : {
            maxHeight: "0px",
            visibility: "hidden",
            overflow: "hidden"
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
          {comments.map((comment: any, index: number) => {
            return <Comment key={comment?._id} position={index} comment={comment} deleteLocalComment={deleteLocalComment} editLocalComment={editLocalComment} />;
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
