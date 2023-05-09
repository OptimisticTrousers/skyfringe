import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useCreatePost = () => {
  const { post } = useHttp();
  const { showToast } = useContext(ToastContext);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/posts`,
        formData
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        showToast("success", "You have successfully created a post!");
        // Return out of the function here to avoid setting the 'completed' response below with error JSON data
        return response.data;
      }

      // error with creating post
      setError(response.data);
      showToast("error", response.data);
    } catch (error) {
      // for all unexpected errors not handled on backend error handling
      const message = "An unknown error occured while creating a post";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};

export default useCreatePost;
