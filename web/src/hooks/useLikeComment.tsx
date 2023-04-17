import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useLikeComment = () => {
  const { put, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  const likeComment = async (commentId: string, postId: string) => {
    const response = await put(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}/comments/${commentId}/likes`
    );
    if (response) {
      showToast("success", "You have successfully updated a post!");
    } else if (error) {
      showToast("error", "An error occured while updating the post.");
    }
    return response;
  };

  return { likeComment, data, loading, error };
};

export default useLikeComment;
