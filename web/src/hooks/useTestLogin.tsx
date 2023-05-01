import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useTestLogin = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const { post } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Submits request to test-specific login route. All login details are kept securely on backend so no data is POSTed
  const testLogin = async () => {
    setLoading(true);
    setError(null);
    const message =
      "An unknown error occured while logging into the test user.";
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/login`,
        {
          email: "luffy@onepiece.com",
          password: "password",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setError(null);
        dispatch({ type: "LOGIN", payload: response.data });
        showToast("success", "Successfully logged in!");
      } else {
        // error with login request
        if (response.status === 403) {
          // invalid credentials
          setError({ message: "Invalid credentials. Try again." });
        } else {
          // unspecified error, return generic error msg
          setError({ message });
          showToast("error", message);
        }
      }
    } catch (err) {
      // internal React hook error
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { testLogin, error, loading };
};

export default useTestLogin;
