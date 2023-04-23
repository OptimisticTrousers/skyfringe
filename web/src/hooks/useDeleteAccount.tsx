import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useDeleteAccount = () => {
  const { remove, loading, error, data } = useHttp();
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const deleteAccount = async (userId: string) => {
    const response = await remove(
      `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`
    );
    if (Array.isArray(response)) {
      showToast("error", response[0].msg);
    } else if (response) {
      showToast("success", "You have successfully created a post!");
      navigate("/login");
    } else if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    return response;
  };

  return { deleteAccount, data, loading, error };
};

export default useDeleteAccount;
