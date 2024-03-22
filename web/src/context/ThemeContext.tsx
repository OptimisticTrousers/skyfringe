import { createContext, FC, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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
  const [value, setValue] = useLocalStorage("theme", "dark")
  const [theme, setTheme] = useState(value);


  const toggleTheme = () => {
    setTheme((prevTheme: string) => {
      if (prevTheme === "light") {
        setValue("dark")
        return "dark";
      } else if (prevTheme === "dark") {
        setValue("light")
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
