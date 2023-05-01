import useFetch from "../../../hooks/useFetch";
import { SkeletonPost } from "../../skeletons";
import { ErrorMessage } from "../../ui";
import Post from "../Post";
import { Post as PostInterface } from "../../../types";
import { useEffect, useState } from "react";

const Feed = () => {
  const {
    data: posts,
    loading,
    error,
  }: any = useFetch(`${import.meta.env.VITE_API_DOMAIN}/posts`);

  const [localPosts, setLocalPosts] = useState(posts);

  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  const handleDeletePost = (postId: string) => {
    setLocalPosts((prevPosts: any) => {
      return prevPosts.filter((prevPost: any) => prevPost._id !== postId);
    });
  };

  const handleEditPost = (postId: string, post: any) => {
    setLocalPosts((prevPosts: any) => {
      return prevPosts.map((prevPost: any) => {
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
      {localPosts && (
        <div>
          {localPosts.map((post: PostInterface) => {
            return (
              <Post
                post={post}
                key={post._id}
                handleDeletePost={handleDeletePost}
                handleEditPost={handleEditPost}
              />
            );
          })}
        </div>
      )}
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
};

export default Feed;
