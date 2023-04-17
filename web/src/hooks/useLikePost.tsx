import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useLikePost = () => {
  const { put, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  const likePost = async (postId: string) => {
    const response = await put(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}/likes`
    );
    if (response) {
      showToast("success", "You have successfully liked a post!");
    } else if (error) {
      showToast("error", "An error occured while liking the post.");
    }
    return response;
  };

  return { likePost, data, loading, error };
};

export default useLikePost;
