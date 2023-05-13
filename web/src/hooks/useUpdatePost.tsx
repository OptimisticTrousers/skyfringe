import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

// Used to update both text and images in posts.
const useUpdatePost = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts FormData object that can include image data
  const updatePost = async (postId: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await put(
        `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`,
        formData
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        showToast("success", "You have successfully updated a post!");
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
      showToast("success", "You have successfully updated a post!");
    } catch (error) {
      // for all unexpected errors not handled on backend error handling
      const message = "An unknown error occured while updating a post";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { updatePost, loading, error };
};

export default useUpdatePost;
