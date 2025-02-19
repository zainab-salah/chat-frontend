import AnimatedDiv from "@/components/AnimatedDiv";
import BackgroundGlow from "@/components/BackgroundGlow";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import { cn, colors } from "@/lib/utils";
import { api } from "@/services/api";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatRoom } from "@/types";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect } from "react";

const ChatRooms: React.FC = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  const navigate = useNavigate();

  const {
    data: chatRooms = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: async () => {
      const response = await api.get("/chatrooms/", {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      return response.data;
    },
    enabled: !!auth?.accessToken,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError]);

  const createRoomMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const response = await api.post(
        "/chatrooms/",
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["chatrooms"] });
    },
    onError: (error) => {
      console.error("Error creating room:", error);
    },
  });
  const deleteRoomMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/chatrooms/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleDelete = (id: number) => {
    deleteRoomMutation.mutate(id);
  };
  return (
    <MaxWidthWrapper className="min-h-screen w-full h-full !overflow-hidden p-5 flex items-center justify-center">
      <BackgroundGlow />

      <AnimatedDiv className="relative w-full rounded-3xl h-full p-5 md:shadow-2xl md:px-10 z-20">
        <h2 className="text-3xl font-bold text-start text-primary mb-4">
          Chat Rooms
        </h2>

        {!chatRooms.length || isLoading ? (
          <ul className="w-full mb-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-10 my-4 mb-2 rounded-full"
              />
            ))}
          </ul>
        ) : isError ? (
          <p className="text-red-500">Failed to load chat rooms</p>
        ) : (
          <ul className="w-full mb-4">
            {chatRooms.map((room: ChatRoom) => {
              if (!room.id) return null;

              return (
                <li
                  key={room.id}
                  className={cn(
                    "border-b border-gray-200 group cursor-pointer hover:bg-gray-50/50 bg-transparent px-1 py-3 flex justify-between items-center transition"
                  )}
                >
                  <Link
                    to={`/chat/${room.id}?name=${encodeURIComponent(
                      room.name
                    )}`}
                    className="flex justify-between items-center w-full"
                  >
                    <span className="text-gray-700 group-hover:text-primary">
                      {room.name}
                    </span>
                    </Link>
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full",
                        colors[room.id % colors.length],
                        "group-hover:opacity-80"
                      )}
                      onClick={() => handleDelete(room.id)}
                    >
                      {}
                    </div>
                </li>
              );
            })}
          </ul>
        )}

        <form
          onSubmit={handleSubmit((data) => createRoomMutation.mutate(data))}
          className="flex space-x-2 mt-8"
        >
          <Input
            type="text"
            className="text-sm !border-b border w-full"
            placeholder="Create new chat room"
            max={50}
            {...register("name", { required: "Room name is required" })}
            disabled={createRoomMutation.isPending}
          />
          <Button
            type="submit"
            className="bg-primary text-white p-2 md:w-1/3 cursor-pointer w-10 rounded-full"
            disabled={createRoomMutation.isPending}
          >
            {createRoomMutation.isPending ? "..." : <Plus size={30} />}
          </Button>
        </form>

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </AnimatedDiv>
    </MaxWidthWrapper>
  );
};

export default ChatRooms;
