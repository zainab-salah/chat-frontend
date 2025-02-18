import {
  ChatBubble,
  ChatBubbleActionWrapper,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { motion, AnimatePresence } from "framer-motion";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
 
import { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper.tsx";
import BackgroundGlow from "@/components/BackgroundGlow";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Welcome to the chat room! Feel free to talk.",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, message: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (event:{
    key: string
  }) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen w-full h-full">
     <BackgroundGlow />
      <MaxWidthWrapper className="py-10 bg-white w-full flex  flex-col items-center justify-center relative">
     
      <div className="relative w-full max-w-2xl rounded-3xl h-[80vh] md:pb-20 p-0 pb-10 md:shadow-2xl md:px-10 z-20 flex flex-col">
        <h2 className="text-3xl font-bold text-center text-primary  mb-5">Chat Room</h2>
        <ChatMessageList className="flex-grow overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const variant = message.sender === "user" ? "sent" : "received";
            return (
              <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`flex ${variant === "sent" ? "justify-end" : "justify-start"}`}
            >
              <ChatBubble  variant={variant}>
                <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
                <ChatBubbleMessage className="text-sm">{message.message}</ChatBubbleMessage>
                <ChatBubbleActionWrapper>
                  {/* <ChatBubbleAction
                    className="size-7"
                    icon={<ArrowRight className="size-4" />}
                    onClick={() => console.log("Action Clicked")}
                  /> */}
                </ChatBubbleActionWrapper>
              </ChatBubble>
              </motion.div>
            );
          })}
            </AnimatePresence>
        </ChatMessageList>
      </div>
        <div className="flex z-20 w-full relative py-5  max-w-2xl mt-4">
          <ChatInput
            className="w-full !bg-white/70 "
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
        </div>
    </MaxWidthWrapper>
    </div>
  
  );
};

export default ChatRoom;
