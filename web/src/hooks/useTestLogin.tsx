import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "./useHttp";
import { Error } from "../types";
import useToast from "./useToast";

const useTestLogin = () => {
  const [testError, setTestError] = useState<Error | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const { post } = useHttp();
  const { success } = useToast();

  // Submits request to test-specific login route. All login details are kept securely on backend so no data is POSTed
  const testLogin = async () => {
    setTestLoading(true);
    setTestError(null);
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/login`
      );
      if (response.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setTestLoading(false);
        setTestError(null);
        dispatch({ type: "LOGIN", payload: response.user });
        success("Logged in!");
        return;
      } else {
        // error with login request. Can only be server error (as opposed to wrong username/password)
        setTestError({
          message: "An unknown error occured while logging into the test user.",
        });
        setTestLoading(false);
      }
    } catch (err) {
      // internal React hook error
      setTestError({
        message: "An unknown error occured while logging into the test user.",
      });
      setTestLoading(false);
    }
  };

  return { testLogin, testError, testLoading };
};

export default useTestLogin;
