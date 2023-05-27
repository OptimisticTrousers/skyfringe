import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useFacebookLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { showToast } = useContext(ToastContext);
  const { dispatch } = useContext(AuthContext);
  const { get } = useHttp();

  const message =
    "An unknown error occured while logging in using Facebook. Try turning off your ad blocker.";

  const loadFacebookSDK = () => {
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: false,
        xfbml: true,
        version: "v16.0",
      });

      (window as any).FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0] as any;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as any;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs?.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  async function logInWithFbAccessToken(token: any) {
    // get user from accessToken
    const url = `${import.meta.env.VITE_API_DOMAIN}/auth/login/facebook?access_token=${token}`;

    try {
      const response = await get(url);
      if (response.status === 200) {
        dispatch({ type: "LOGIN", payload: response.data });
        setError(null);
        return;
      }
      setError(response.data);
      showToast("error", response.data.message);
    } catch (error) {
      setError(error);
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  }

  const facebookLogin = () => {
    setLoading(true);
    (window as any).FB.login(function (response: any) {
      if (response.status === "connected") {
        const accessToken = response.authResponse.accessToken;
        logInWithFbAccessToken(accessToken);
      } else {
        setLoading(false);
        showToast("error", message);
      }
    });
  };

  useEffect(() => {
    loadFacebookSDK();
  }, []);

  return { facebookLogin, loading, error };
};

export default useFacebookLogin;
