import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useUpdateComment = () => {
  const { put, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  const updateComment = async (
    commentId: string,
    postId: string,
    formData: any
  ) => {
    const response = await put(
      `${
        import.meta.env.VITE_API_DOMAIN
      }/posts/${postId}/comments/${commentId}`,
      formData
    );
    if (response) {
      showToast("success", "You have successfully updated a comment!");
    } else if (error) {
      showToast("error", "An error occured while updating the comment.");
    }
    return response;
  };

  return { updateComment, data, loading, error };
};

export default useUpdateComment;
