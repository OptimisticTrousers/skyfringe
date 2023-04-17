import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { CommentData } from "../types";
import useHttp from "./useHttp";

const useCreateComment = () => {
  const { post, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  const createComment = async (postId: string, formData: CommentData) => {
    const response = await post(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}/comments`,
      formData
    );
    if (response) {
      showToast("success", "You have successfully commented on this post!");
    } else if (error) {
      showToast("error", "An error occured while commenting on the post.");
    }
    return response;
  };

  return { createComment, data, loading, error };
};

export default useCreateComment;
