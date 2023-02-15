import { createContext, FC, useReducer } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface AuthContext {
  user: any;
}

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContext = createContext({} as AuthContext);

const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  return (
    <AuthContext.Provider value={{ state }}>{children}</AuthContext.Provider>
  );
};
