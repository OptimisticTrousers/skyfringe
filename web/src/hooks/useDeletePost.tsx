import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

// Export easily callable function that can delete posts by ID
const useDeletePost = () => {
  const { remove, loading, error, data } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts the post ID of the post to be deleted
  const deletePost = async (postId: string) => {
    const response = await remove(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`
    );
    if (response) {
      showToast("success", "You have successfully deleted a post!");
    } else if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    return response;
  };

  return { deletePost, data, loading, error };
};

export default useDeletePost;
