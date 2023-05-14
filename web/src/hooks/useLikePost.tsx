import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useLikePost = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts the post ID of the post to be liked
  const likePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    const message = "There was a problem liking this post";
    try {
      const response = await put(
        `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}/likes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, request successfull
        setError(null);
        // Return out of the function here to avoid setting the response below with error JSON
        return response.data;
      }
      setError({ message });
      showToast("error", message);
    } catch (error) {
      const message = "An unknown error occured while liking a post";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { likePost, loading, error };
};

export default useLikePost;
