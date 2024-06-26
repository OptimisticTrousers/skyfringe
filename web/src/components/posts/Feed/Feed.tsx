import useFetch from "../../../hooks/useFetch";
import { SkeletonPost } from "../../skeletons";
import { ErrorMessage } from "../../ui";
import Post from "../Post";
import { PostWithStringId as IPost } from "@backend/types";
import { FC } from "react";

interface Props {
  setFeed: any;
  loading: boolean;
  error: any;
  posts: IPost[];
}

const Feed: FC<Props> = ({ setFeed, loading, error, posts }) => {
  const handleDeletePost = (postId: string) => {
    setFeed((prevPosts: IPost[]) => {
      return prevPosts.filter((prevPost: IPost) => prevPost._id !== postId);
    });
  };

  const handleEditPost = (postId: string, post: IPost) => {
    setFeed((prevPosts: IPost[]) => {
      return prevPosts.map((prevPost: IPost) => {
        if (prevPost._id === postId) {
          return post;
        }
        return prevPost;
      });
    });
  };

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
          {posts.map((post: IPost) => {
            return (
              <Post
                post={post}
                key={post?._id}
                handleDeletePost={handleDeletePost}
                handleEditPost={handleEditPost}
                setFeed={setFeed}
              />
            );
          })}
        </div>
      )}
      {error !== null && (
        <div
          style={{
            marginBottom: "2rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ErrorMessage message={error.message} />
        </div>
      )}
    </div>
  );
};

export default Feed;
