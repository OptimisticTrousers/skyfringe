import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const useToast = () => {
  const { showToast } = useContext(ToastContext);
  const success = (message: string) => {
    showToast("success", message);
  };
  const error = (message: string) => {
    showToast("error", message);
  };

  return { success, error };
};

export default useToast;
