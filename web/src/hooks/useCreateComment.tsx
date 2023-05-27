import { useState, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useCreateComment = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { post } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Requires the post ID to attach the comment to that post, as well as the comment text
  const createComment = async (postId: string, formData: any) => {
    setLoading(true);
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}/comments`,
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
        showToast("success", "You have successfully created a comment!");
        // Return out of the function here to avoid setting the 'completed' response below with error JSON data
        return response.data;
      }
      // error with posting comment
      const message = response.data[0].msg;
      setError({ message });
      showToast("error", message);
    } catch (error) {
      // for all unexpected errors not handled on backend error handling
      const message = "An unknown error occured while creating a comment";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { createComment, loading, error };
};

export default useCreateComment;
