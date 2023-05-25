import { createContext, FC, useState } from "react";
import { UserWithStringId as IUser } from "@backend/types";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface ChatContext {
  isAsideOpen: boolean;
  toggleAside: () => void;
  setSelectedChat: (user: IUser) => void;
  selectedChat: IUser;
}

// Create an instance of React Context
export const ChatContext = createContext<any>({} as ChatContext);

export const ChatProvider: FC<Props> = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  const toggleAside = () => {
    setIsAsideOpen((prevValue) => !prevValue);
  };

  return (
    <ChatContext.Provider
      value={{ isAsideOpen, toggleAside, setSelectedChat, selectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
