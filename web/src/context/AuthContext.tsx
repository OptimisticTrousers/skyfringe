import { createContext, FC, useReducer } from "react";
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
  payload?: any;
}

// Reducer function to handle different auth-related actions. Typically the payload in each case will be a user object
export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    // Login action will always contain a payload of user object
    case "LOGIN":
      return { ...state, user: action.payload };

    // Remove user object on logout action dispatch
    case "LOGOUT":
      return { ...state, user: null };

    // Used to set the ready property before initial rendering of any components. This allows conditional rendering
    case "READY":
      return { ...state, user: action.payload, ready: true };

    // Update the current state with the most recent version of a user. Used when updating profile details
    case "UPDATE":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export const AuthContext = createContext({} as any);

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
