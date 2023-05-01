import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

// Export easily callable function that can delete posts by ID
const useDeletePost = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { remove } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts the post ID of the post to be deleted
  const deletePost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await remove(
        `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        showToast("success", "You have successfully deleted a post!");
        // Return out of the function here to avoid setting the response below with error JSON
        return response.data;
      }
      // error with delete operation
      setError(response.data);
    } catch (error) {
      const message = "An unknown error occured while deleting a post";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
};

export default useDeletePost;
