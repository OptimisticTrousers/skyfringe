import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useRegister = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [formError, setFormError] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { post } = useHttp();
  const { dispatch } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  // Call this function with the object created using relevant user sign up data
  const register = async (formData: any) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    const message = "An unknown error occured while registering";
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setError(null);
        setFormError(null);
        dispatch({ type: "LOGIN", payload: response.data });
        showToast("error", "Successfully registered!");
        return;
      } else {
        // error with login request
        if (response.data[0].msg === "E-mail already in use") {
          // user must select a different email. Set to formError
          setFormError([{ msg: "This email is taken. Choose another." }]);
        } else if (response.data.length) {
          // length indicates form validation errors (i.e. JSON response is array)
          setFormError(response.data);
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

  return { register, loading, error, formError };
};

export default useRegister;
