import { createContext, FC, useCallback, useContext, useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

// Create an instance of React Context
export const ToastContext = createContext({});

// Provide ability to spawn Toast notification globally within the application
export const ToastProvider: FC<Props> = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastParams, setToastParams] = useState({});

  // Set time that toast is visible
  const durationMilliseconds = 3000;

  // Call this function from any component when a toast message needs to be displayed.
  const showToast = useCallback((type: string, message: string) => {
    setToastVisible(true);

    // Provide safe defaults if there is no message of type explicitly set
    setToastParams({
      type: type ? type : "error",
      message: message ? message : "",
    });

    setTimeout(() => {
      setToastVisible(false);
    }, durationMilliseconds);
  }, []);

  return (
    // showToast is the main part of the context value that needs to be accessible by all components. The other two values are used by the Toast component in _app.tsx only
    <ToastContext.Provider
      value={{ showToast, toastVisible, setToastVisible, toastParams }}
    >
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to allow components to access the context
export const useToastContext = () => {
  const context = useContext(ToastContext);

  // Can optionally add conditional here to ensure toast context is used only by those components wrapped in a toast context provider

  console.log(context)
  return context;
};
