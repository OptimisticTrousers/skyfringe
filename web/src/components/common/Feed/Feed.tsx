import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useErrorToast from "../../../hooks/useErrorToast";
import { useFetch } from "../../../hooks/useFetch";
import { Post as PostInterface } from "../../../types";
import { SkeletonPost } from "../../skeletons";
import { ErrorMessage } from "../../ui/ErrorMessage";
import Post from "../Post";

const Feed = () => {
  const {
    data: posts,
    loading,
    error,
  }: any = useFetch(`${import.meta.env.VITE_API_DOMAIN}/posts`);

  return (
    <div>
      {loading && (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      )}
      {posts && (
        <div>
          {posts.map((post: PostInterface) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      )}
      {error && <ErrorMessage message={"Unable to load feed"} />}
    </div>
  );
};

export default Feed;
