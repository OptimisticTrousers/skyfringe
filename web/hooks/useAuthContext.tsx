import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // If the context is used to wrap only a subtree of components, this function ensures context is present to avoid using outside of desired location
  if (!context) {
    throw Error('useAuthContext must be inside an AuthContextProvider');
  }

  return context;
}