import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useDeleteComment = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { remove } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Requires both post and comment ID to ensure the API route is satisfied and that the comment is removed from the post's comments array.
  const deleteComment = async (postId: string, commentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await remove(
        `${
          import.meta.env.VITE_API_DOMAIN
        }/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, operation successful
        setError(null);
        showToast("success", "You have successfully deleted a comment!");
        // Return out of the function here to avoid setting the response below with error JSON
        return response.data;
      }
      // error with delete operation
      setError(response.data);
    } catch (error) {
      const message = "An unknown error occured while deleting a comment";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { deleteComment, loading, error };
};

export default useDeleteComment;
