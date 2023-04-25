import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useUpdateComment = () => {
  const { put, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  const updateComment = async (
    commentId: string,
    postId: string,
    formData: FormData
  ) => {
    const response = await put(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/posts/${postId}/comments/${commentId}`,
      formData
    );
    if (Array.isArray(response)) {
      showToast("error", response[0].msg);
    } else if (response) {
      showToast("success", "You have successfully created a post!");
    } else if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    return response;
  };

  return { updateComment, data, loading, error };
};

export default useUpdateComment;
