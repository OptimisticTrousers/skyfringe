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
  ready: boolean;
}

interface AuthState {
  user: User | null;
  ready: boolean;
}

interface Action {
  type: string;
  payload: User;
}

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, ready: true };
    case "LOGOUT":
      return { ...state, user: null, ready: true };
    case "UPDATE":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    ready: false,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
