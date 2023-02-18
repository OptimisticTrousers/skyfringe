import { createContext, FC, useReducer } from "react";
import { User } from "../types";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface AuthContext {
  dispatch: (action: Action) => void;
  user: User | null;
  authLoading: boolean;
}

interface AuthState {
  user: User | null;
  authLoading: boolean;
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

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authLoading: false,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
