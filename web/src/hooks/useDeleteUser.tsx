import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useDeleteUser = () => {
  const { remove, loading, error, data } = useHttp();
  const { showToast } = useContext(ToastContext);

  const deleteUser = async (userId: string) => {
    const response = await remove(
      `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`
    );
    if (Array.isArray(response)) {
      showToast("error", response[0].msg);
    } else if (response) {
      showToast("success", "You have successfully created a post!");
    } else if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    return response;
  };

  return { deleteUser, data, loading, error };
};

export default useDeleteUser;
