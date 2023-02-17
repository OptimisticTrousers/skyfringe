import { FC, useState, createContext, useContext } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface ThemeContext {
  theme: string;
  toggleTheme: () => void;
}

// Create an instance of React Context
export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") {
        return "dark";
      } else if (prevTheme === "dark") {
        return "light";
      }
      return "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};