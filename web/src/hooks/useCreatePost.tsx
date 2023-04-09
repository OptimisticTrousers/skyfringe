import useHttp from "./useHttp";
import { PostData } from "../types";
import { useContext, useEffect } from "react";
import { ToastContext } from "../context/ToastContext";

const useCreatePost = () => {
  const { post, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData: PostData) => {
    const response = await post(
      `${import.meta.env.VITE_API_DOMAIN}/posts`,
      formData
    );
    if (response) {
      showToast("success", "You have successfully created a post!");
    } else if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    return response;
  };

  return { createPost, data, loading, error };
};

export default useCreatePost;
