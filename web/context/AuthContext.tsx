import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createContext, FC, useReducer } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { User } from "../types";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface AuthContext {
  dispatch: (action: Action) => void;
  user: User | null;
}

interface AuthState {
  user: User | null;
}

interface Action {
  type: string;
  payload: User;
}

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token: any = context.req.headers.cookie;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/current`,
    {
      headers: {
        cookie: token,
      },
    }
  );

  const data = await response.json();
  console.log(data)

  if (!data.hasOwnProperty("user")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
