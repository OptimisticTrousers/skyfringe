import { createContext, FC, useCallback, useState } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

type ShowToast = (type: string, message: string) => void;

export interface ToastParams {
  type: string;
  message: string;
}

export interface ToastContext {
  showToast: ShowToast;
  toastVisible: boolean;
  setToastVisible: (visible: boolean) => void;
  toastParams: ToastParams | null;
}

// Create an instance of React Context
export const ToastContext = createContext({} as ToastContext);

// Provide ability to spawn Toast notification globally within the application
export const ToastProvider: FC<Props> = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastParams, setToastParams] = useState<ToastParams | null>(null);

  // Set time that toast is visible
  const durationMilliseconds = 3000;

  // Call this function from any component when a toast message needs to be displayed.
  const showToast = useCallback<ShowToast>((type, message) => {
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
