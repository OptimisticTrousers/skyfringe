import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

// Custom hook to allow components to access the context
const useToastContext = () => {
  const context = useContext(ToastContext);

  // Can optionally add conditional here to ensure toast context is used only by those components wrapped in a toast context provider

  return context;
};

export default useToastContext;
