import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

// Used to update textual profile information only; no image updates.
const useUpdateUser = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Pass in a basic object constructed using any relevant profile information to be updated
  const updateUser = async (userId: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    try {
      const response = await put(
        `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`,
        formData
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        setFormError(null);
        return response.data;
      } else if (response.status === 404) {
        const data = response.data;
        setError(data);
        setFormError(null);
        showToast("error", data.message);
      } else {
        // form validation error
        setError(null);
        setFormError(response.data);
        // Return out of the function here to avoid setting the 'completed' response below with error JSON data
        return;
      }
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

  return { updateUser, formError, loading, error };
};

export default useUpdateUser;
