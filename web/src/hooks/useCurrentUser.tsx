import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "./useHttp";

const useCurrentUser = () => {
  const { dispatch } = useContext(AuthContext);

  const { get } = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const data = await get(
          `${import.meta.env.VITE_API_DOMAIN}/auth/current`
        );
        dispatch({ type: "READY", payload: data?.user });
      } catch (err) {
        // user is not authorized - do not react to this error in UI, console display only
        console.error(err);
      }
    })();
  }, []);
};

export default useCurrentUser;
