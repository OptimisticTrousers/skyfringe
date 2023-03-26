import { useEffect } from "react";

const useDisableScroll = () => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.removeProperty("overflow");
    };
  }, []);
};

export default useDisableScroll;
