import { createContext, FC, useReducer } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface AuthContext {
  dispatch: (action: Action) => void;
  user: any | null;
}

interface AuthState {
  user: any | null;
}

interface Action {
  type: string;
  payload: any | null;
}

// Reducer function to handle different auth-related actions. Typically the payload in each case will be a user object
export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    // Login action will always contain a payload of user object
    case "LOGIN":
      return { user: action.payload };
    // Remove user object on logout action dispatch
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext({} as any);

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
