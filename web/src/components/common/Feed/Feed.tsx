import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useErrorToast from "../../../hooks/useErrorToast";
import { useFetchGet } from "../../../hooks/useFetchGet";
import { SkeletonPost } from "../../skeletons";
import { ErrorMessage } from "../../ui/ErrorMessage";
import Post from "../Post";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const {
    data: posts,
    loading,
    error,
  }: any = useFetchGet(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user!._id}/feed`
  );

  // Set up notifications
  useErrorToast(error);

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
          {posts.map((post: any) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Feed;