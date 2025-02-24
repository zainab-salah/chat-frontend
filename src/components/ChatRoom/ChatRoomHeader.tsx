import { ChevronLeft } from "lucide-react";
import React from "react";

type ChatRoomHeaderProps = {
    roomName: string | null;
  };
  
  const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ roomName }) => {
    return (
      <h2 className="text-3xl ps-5 pt-5 capitalize font-bold text-center text-primary mb-5">
        <ChevronLeft
          size={40}
          className="cursor-pointer absolute left-5 top-5"
          onClick={() => history.back()}
        />
        {roomName}
        <span className="text-sm text-gray-400 font-thin block">Chat Room</span>
      </h2>
    );
  };

  export default ChatRoomHeader;