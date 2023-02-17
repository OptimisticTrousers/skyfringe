import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default useThemeContext;
