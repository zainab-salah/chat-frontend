import { Message } from "@/types";
import React from "react";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { AnimatePresence } from "framer-motion";
import MessageItem from "../MessageItem";

type ChatRoomMessagesProps = {
    messages: Message[];
    auth: { userId: string };
    handleDelete: (id: string) => void;
    
  };
  
  const ChatRoomMessages: React.FC<ChatRoomMessagesProps> = ({ messages, auth, handleDelete }) => {
    return (
      <ChatMessageList className="flex-grow overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <MessageItem
              key={message.id || `fallback-key-${index}`}
              message={message}
              LoggedUser={auth.userId}
              handleDelete={() => handleDelete(message.id)}
            />
          ))}
        </AnimatePresence>
      </ChatMessageList>
    );
  };
  

  export default ChatRoomMessages;