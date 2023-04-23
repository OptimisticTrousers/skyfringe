import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useUpdateUser = () => {
  const { put, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  const updateUser = async (userId: string, formData: any) => {
    const response = await put(
      `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`,
      formData
    );
    if (response) {
      showToast(
        "success",
        "You have successfully updated your account details!"
      );
    } else if (error) {
      showToast(
        "error",
        "An error occured while updating your account details."
      );
    }
    return response;
  };

  return { updateUser, data, loading, error };
};

export default useUpdateUser;
