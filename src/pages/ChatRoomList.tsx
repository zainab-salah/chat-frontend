import AnimatedDiv from "@/components/AnimatedDiv";
import BackgroundGlow from "@/components/BackgroundGlow";
import MaxWidthWrapper from "@/components/MaxWidthWrapper.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshToken";
import { cn, colors } from "@/lib/utils";
import { api } from "@/services/api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChatRoom } from "@/types";

const ChatRooms: React.FC = () => {
  const [newRoom, setNewRoom] = useState("");
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  // Fetch chat rooms using React Query
  const { data: chatRooms = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: async () => {
      const response = await api.get("/chatrooms", {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      return response.data;
    },
    enabled: !!auth?.accessToken,  
  });

  const addChatRoom = () => {
    if (newRoom.trim() !== "") {
      setNewRoom("");
      refetch();  
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
      <Button
        onClick={() => refresh()}
        className="absolute top-5 right-5 bg-primary text-white p-2 cursor-pointer rounded-full"
      >
        Fetch
      </Button>
      <AnimatedDiv className="relative w-full rounded-3xl h-full p-5 md:shadow-2xl md:px-10 z-20">
        <h2 className="text-3xl font-bold text-start text-primary mb-4">Chat Rooms</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading chat rooms...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load chat rooms</p>
        ) : (
          <ul className="w-full mb-4">
            {chatRooms.map((room:ChatRoom) => (
              <li
                key={room.id}
                className={cn(
                  "border-b border-gray-200 group cursor-pointer hover:bg-gray-50/50 bg-transparent px-1 py-3 flex justify-between items-center transition"
                )}
              >
                <Link
                  to={`/chat/${room.id}`}
                  className="flex justify-between items-center w-full"
                >
                  <span className="text-gray-700 group-hover:text-primary">
                    {room.name}
                  </span>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full",
                      colors[room.id % colors.length],
                      "group-hover:opacity-80"
                    )}
                  ></div>
                </Link>
              </li>
            ))}
          </ul>
        )}
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
      </AnimatedDiv>
    </MaxWidthWrapper>
  );
};

export default ChatRooms;
