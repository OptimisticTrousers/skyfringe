import { useContext, useEffect } from "react";
import { ToastContext } from "../context/ToastContext";
import { Error } from "../types";

// Show an error toast with a fixed, non-specific message whenever a designated error property is set to true (e.g. on data fetch or post)

const useErrorToast = (error: Error | null) => {
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    if (error) {
      showToast("error", error.message);
    }
  }, [error, showToast]);
};

export default useErrorToast;
