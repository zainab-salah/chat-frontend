import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BackgroundGlow from "@/components/BackgroundGlow";
import { websocketService } from "@/services/websocket";
import { Message } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import ChatRoomHeader from "@/components/ChatRoom/ChatRoomHeader";
import ChatRoomMessages from "@/components/ChatRoom/ChatRoomMessages";
import ChatRoomInput from "@/components/ChatRoom/ChatRoomInput";
import { Loader2 } from "lucide-react";
const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomName = searchParams.get("name");

  const { auth } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const {
    data: oldMessages = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Message[]>({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const response = await api.get(`messages/${roomId}/`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      return response.data.messages;
    },
    enabled: !!auth?.accessToken && !!roomId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (Array.isArray(oldMessages) && oldMessages.length > 0) {
      setMessages((prevMessages) => {
        const uniqueMessages = [...prevMessages, ...oldMessages].reduce(
          (acc, message) => {
            acc[message.id] = message;
            return acc;
          },
          {} as Record<string, Message>
        );
        return Object.values(uniqueMessages);
      });
    }
  }, [oldMessages]);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages((prevMessages) => {
        if (prevMessages.some((msg) => msg.id === message.id)) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    };

    if (roomId && auth?.accessToken) {
      websocketService.connect(roomId, auth.accessToken, handleMessage);
    }

    return () => {
      websocketService.disconnect();
    };
  }, [roomId, auth?.accessToken]);

  const sendMessage = async () => {
    if (newMessage.trim() !== "" && roomId) {
      try {
        await api.post(
          "messages/create/",
          {
            chatroom_id: roomId,
            content: newMessage.trim(),
            user_id: auth?.userId,
            username: auth?.user,
            timestamp: new Date().toISOString(),
          },
          { headers: { Authorization: `Bearer ${auth?.accessToken}` } }
        );
        websocketService.sendMessage(
          roomId,
          newMessage.trim(),
          auth?.userId,
          auth?.user,
          new Date().toISOString()
        );
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/messages/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
    },
    onSuccess: () => {
      refetch();
      
    },
  });

  const handleDelete = (id: string) => {
    deleteMessageMutation.mutate(id, {
      onSuccess: () => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
      },
    });
  };
  if (isLoading) {
    return (
      <Loader2 className="animate-spin h-10 w-10 mx-auto p-6 text-primary" />
    );
  }

  if (isError || !roomId) {
    return <p className="text-red-500 text-center">Failed to load messages</p>;
  }
  return (
    <div className="relative w-full h-full">
      <BackgroundGlow />
      <MaxWidthWrapper className="py-10 bg-white w-full flex flex-col items-center justify-center relative">
        <div className="relative w-full max-w-2xl rounded-3xl min-h-[60vh] md:pb-28 p-0 pb-10 md:shadow-2xl md:px-10 z-20 flex flex-col">
          <ChatRoomHeader roomName={roomName} />
          <ChatRoomMessages
            handleDelete={handleDelete}
            messages={messages}
            auth={auth}
          />
        </div>
        <ChatRoomInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleKeyDown={handleKeyDown}
          roomId={roomId}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default ChatRoom;
