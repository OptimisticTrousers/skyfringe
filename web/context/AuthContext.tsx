import { createContext, FC, useReducer } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface AuthContext {
  user: any;
  dispatch: any;
}

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "FETCHED_AUTH":
      return { ...state, fetchedAuth: true };
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
    fetchedAuth: false,
  });

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
