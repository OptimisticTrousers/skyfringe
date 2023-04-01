import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "./useHttp";
import { Error } from "../types";
import useToast from "./useToast";

const useTestLogin = () => {
  const [testError, setTestError] = useState<Error | null>(null);
  const { dispatch } = useContext(AuthContext);
  const { post, loading } = useHttp();
  const { success } = useToast();

  // Submits request to test-specific login route. All login details are kept securely on backend so no data is POSTed
  const testLogin = async () => {
    setTestError(null);
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/login`
      );
      if (response.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setTestError(null);
        dispatch({ type: "LOGIN", payload: response.user });
        success("Logged in!");
        return;
      } else {
        // error with login request. Can only be server error (as opposed to wrong username/password)
        setTestError({
          message: "An unknown error occured while logging into the test user.",
        });
      }
    } catch (err) {
      // internal React hook error
      setTestError({
        message: "An unknown error occured while logging into the test user.",
      });
    }
  };

  return { testLogin, testError, testLoading: loading };
};

export default useTestLogin;
