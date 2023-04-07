import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

type CloseDropdown = () => void;

// Export easily callable function that can delete posts by ID
const useDeletePost = (closeDropdown: CloseDropdown) => {
  const { remove, loading, error, data } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts the post ID of the post to be deleted
  const deletePost = async (postId: string) => {
    const response = await remove(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`
    );
    return response;
  };

  useEffect(() => {
    if (data) {
      showToast("success", "You have successfully created a post!");
      closeDropdown();
    }

    if (error) {
      showToast("error", "An error occured while creating the post.");
      closeDropdown();
    }
  }, [data, showToast, closeDropdown]);

  return { deletePost, data, loading, error };
};

export default useDeletePost;
