import { useState, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useLikeComment = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Requires both the post and comment IDs simply due to the REST API arrangement
  const likeComment = async (commentId: string, postId: string) => {
    setLoading(true);
    setError(null);
    const message = "There was a problem liking this comment";
    try {
      const response = await put(
        `${
          import.meta.env.VITE_API_DOMAIN
        }/posts/${postId}/comments/${commentId}/likes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        // Return out of the function here to avoid setting the response below with error JSON
        return response.data;
      }

      // error with liking comment
      setError({ message });
      showToast("error", message);
    } catch (error) {
      const message = "An unknown error occured while liking a comment";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { likeComment, loading, error };
};

export default useLikeComment;
