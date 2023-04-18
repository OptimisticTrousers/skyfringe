import useFetch from "../../../hooks/useFetch";
import { SkeletonPost } from "../../skeletons";
import { ErrorMessage } from "../../ui";
import Post from "../Post";
import { Post as PostInterface } from "../../../types";

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
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
};

export default Feed;
