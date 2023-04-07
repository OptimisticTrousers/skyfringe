import { useState } from "react";
import useHttp from "./useHttp";

// Export easily callable function that can delete posts by ID
const useDeletePost = () => {
  const { remove, loading, error, data } = useHttp();

  // Accepts the post ID of the post to be deleted
  const deletePost = async (postId: string) => {
    const response = await remove(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`
    );
    return response;
  };

  return { deletePost, data, loading, error };
};

export default useDeletePost;
