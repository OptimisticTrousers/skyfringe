import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useCurrentUser from "../../../hooks/useCurrentUser";

interface Props {
  children: JSX.Element;
}

/*
I want you to write the correct logic for routing with Next.js. I have an AuthContext that has the "user" property and the "ready" property. The user property is the current authenticated user, while the "ready" property indicates if the client has finished fetching data from my Express.js server. I have a route that makes sure the user is authenticated on every route that the user goes to. The "useCurrentUser" hook fetches the data and changes the state according to whether the user has valid credentials. I want to make it so that if the user is authenticated and if they go to the login or register pages, then they are re-directed back to the home page. If the user is not authenticated and they go to any other page besides the "/login", "/register", "/404", or "/505" pages, it will redirect them back to the login page. Write the routing logic you would need for a typical authentication system.
*/

const AuthRoutes: FC<Props> = ({ children }) => {
  const { user, ready } = useContext(AuthContext);
  const router = useRouter();
  useCurrentUser();
  if (user) {
    if (router.pathname === "/login" || router.pathname === "/register") {
      router.push("/");
      return null;
    }
  } else if (
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/404" ||
    router.pathname === "/500"
  ) {
    return children;
  } else if (ready) {
    router.push("/login");
  }

  return children;
};

export default AuthRoutes;
