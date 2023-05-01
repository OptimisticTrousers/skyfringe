import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import { CommentData } from "../types";
import useHttp from "./useHttp";

const useUpdateComment = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Requires both post and comment ID to satisfy the API route
  const updateComment = async (
    commentId: string,
    postId: string,
    formData: CommentData
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await put(
        `${
          import.meta.env.VITE_API_DOMAIN
        }/posts/${postId}/comments/${commentId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        showToast("success", "You have successfully updated a comment!");
        return response.data;
      } else if (response.status === 403) {
        const data = response.data;
        setError(data);
        showToast("error", data.message);
      } else {
        const data = response.data[0];
        setError(data);
        showToast("error", data.msg);
      }
      // error with editing comment
      setError(response.data);
      showToast("success", "You have successfully updated a comment!");
    } catch (error) {
      // for all unexpected errors not handled on backend error handling
      const message = "An unknown error occured while updating a comment";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };
  return { updateComment, loading, error };
};

export default useUpdateComment;
