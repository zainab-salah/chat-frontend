import React from "react";
import { motion } from "framer-motion";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { Message } from "@/types";
import { Trash } from "lucide-react";

interface MessageItemProps {
  message: Message;
  isSentByUser: boolean | undefined;
  handleDelete: () => void;
}
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isSentByUser,
  handleDelete,
}) => {
  const variant = isSentByUser ? "sent" : "received";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={`flex relative ${
        isSentByUser ? "justify-end" : "justify-start"
      }`}
    >
      <ChatBubble variant={variant}>
        <ChatBubbleAvatar fallback={isSentByUser ? "US" : "AI"} />
        <ChatBubbleMessage className="text-sm">
          {message.content}
        </ChatBubbleMessage>
        {isSentByUser && (
          <ChatBubbleActionWrapper>
            <ChatBubbleAction
              className="size-7 cursor-pointer hover:bg-red-400"
              icon={<Trash className="size-4" />}
              onClick={handleDelete}
            />
          </ChatBubbleActionWrapper>
        )}
      </ChatBubble>
      {message.timestamp && (
        <span className= { `text-xs absolute  bottom-[-20px] text-black/30 mt-1 
          ${
            isSentByUser ? "right-10" : "left-10"
          }
        `}>
          {dayjs(message.timestamp).fromNow()}
        </span>
      )}
    </motion.div>
  );
};

export default MessageItem;
