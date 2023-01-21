import { FC, useState, createContext } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface ChatContext {
  isAsideOpen: boolean;
  toggleAside: () => void;
}

// Create an instance of React Context
const ChatContext = createContext<ChatContext>({} as ChatContext);

const ChatProvider: FC<Props> = ({ children }) => {
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

export default ChatProvider;
