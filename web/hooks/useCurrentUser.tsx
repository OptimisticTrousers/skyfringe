import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "./useHttp";

const useCurrentUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const { error, loading, get } = useHttp();

  useEffect(() => {
    (async () => {
      const data = await get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/current`,
        {
          mode: "cors",
          credentials: "include",
          method: "GET",
        }
      );
      dispatch({ type: "LOGIN", payload: data.user });
    })();
  }, []);

  return { error, loading };
};

export default useCurrentUser;
