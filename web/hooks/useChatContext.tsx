import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const useChatContext = () => {
  const context = useContext(ChatContext);

  return context;
};

export default useChatContext;
