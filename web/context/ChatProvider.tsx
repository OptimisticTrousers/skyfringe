import { FC, useState, createContext } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface ChatContext {
  isAsideOpen: boolean;
  toggleAside: () => void;
}

// Create an instance of React Context
export const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider: FC<Props> = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen((prevValue) => !prevValue);
  };

  return (
    <ChatContext.Provider value={{ isAsideOpen, toggleAside }}>
      {children}
    </ChatContext.Provider>
  );
};