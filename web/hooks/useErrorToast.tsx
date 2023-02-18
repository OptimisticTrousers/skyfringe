import { useEffect } from "react";
import { ToastContext } from "../context/ToastContext";
import { Error } from "../types";
import useToastContext from "./useToastContext";

// Show an error toast with a fixed, non-specific message whenever a designated error property is set to true (e.g. on data fetch or post)

const useErrorToast = (error: Error | null, errorMsg: string ) => {
  const { showToast }: ToastContext = useToastContext();

  useEffect(() => {
    if (error) {
      showToast("error", errorMsg);
    }
  }, [error, errorMsg, showToast]);
};

export default useErrorToast;
