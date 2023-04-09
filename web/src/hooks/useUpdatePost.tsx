import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { PostData } from "../types";
import useHttp from "./useHttp";

// Used to update both text and images in posts.
const useUpdatePost = () => {
  const { put, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts FormData object that can include image data
  const updatePost = async (postId: string, formData: PostData) => {
    const response = await put(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`,
      formData
    );
    if (response) {
      showToast("success", "You have successfully deleted a post!");
    } else if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    return response;
  };

  return { updatePost, data, loading, error };
};

export default useUpdatePost;
