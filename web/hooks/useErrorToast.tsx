import { useEffect } from "react";
import useToastContext from "./useToastContext";

// Show an error toast with a fixed, non-specific message whenever a designated error property is set to true (e.g. on data fetch or post)

const useErrorToast = (error: any, errorMsg: string) => {
  const { showToast }: any = useToastContext();

  useEffect(() => {
    if (error) {
      showToast("error", errorMsg);
    }
  }, [error, errorMsg, showToast]);
};

export default useErrorToast;
