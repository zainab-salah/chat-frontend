import React from "react";
import { ChatInput } from "../ui/chat/chat-input";

type ChatRoomInputProps = {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    roomId: string | undefined;
  };
  
  const ChatRoomInput: React.FC<ChatRoomInputProps> = ({ newMessage, setNewMessage, handleKeyDown, roomId }) => {
    return (
      <div className="flex z-20 w-full relative py-5 max-w-2xl mt-12">
        <ChatInput
          className="w-full !bg-white/70"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={!roomId}
        />
      </div>
    );
  };

  export default ChatRoomInput;