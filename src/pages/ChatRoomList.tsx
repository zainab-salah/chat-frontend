import BackgroundGlow from "@/components/BackgroundGlow";
import MaxWidthWrapper from "@/components/MaxWidthWrapper.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, colors } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

const ChatRooms: React.FC = () => {
  const [chatRooms, setChatRooms] = useState([
    "General Chat",
    "Tech Talk",
    "Gaming Zone",
    "Study Group",
  ]);
  const [newRoom, setNewRoom] = useState("");

  const addChatRoom = () => {
    if (newRoom.trim() !== "") {
      setChatRooms([...chatRooms, newRoom]);
      setNewRoom("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addChatRoom();
    }
  };

  return (
    <MaxWidthWrapper className="min-h-screen w-full h-full !overflow-hidden p-5 flex items-center justify-center">
      <BackgroundGlow />
      {/* Chat Rooms List */}
      <div className="relative w-full rounded-3xl h-full p-5 md:shadow-2xl md:px-10 z-20">
        <h2 className="text-3xl font-bold text-start text-primary mb-4">Chat Rooms</h2>
        <ul className="w-full mb-4">
          {chatRooms.map((room, index) => (
            <li
              key={index}
              className={cn(
                "border-b border-gray-200 group cursor-pointer hover:bg-gray-50/50 bg-transparent px-1 py-3 flex justify-between items-center transition"
              )}
            >
              <span className="text-gray-700 group-hover:text-primary">{room}</span>
              <div className={cn("w-6 h-6 rounded-full", colors[index % colors.length], "group-hover:opacity-80")}></div>
            </li>
          ))}
        </ul>

        {/* New Chat Room Form */}
        <div className="flex space-x-2 mt-8">
          <Input
            type="text"
            className="text-sm !border-b border w-full"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create new chat room"
          />
          <Button
            onClick={addChatRoom}
            className="bg-primary text-white p-2 md:w-1/3 cursor-pointer w-10 rounded-full"
          >
            <Plus size={30} />
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ChatRooms;
