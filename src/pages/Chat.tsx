import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BackgroundGlow from "@/components/BackgroundGlow";
import { websocketService } from "@/services/websocket";
import { Message } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import MessageItem from "@/components/MessageItem";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, Loader2 } from "lucide-react";

const ChatRoom = () => {
  const { roomId } = useParams();

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

        const updatedMessages = [...prevMessages, message];
        return updatedMessages;
      });
    };

    if (roomId && auth?.accessToken) {
      console.log("🔌 Connecting WebSocket...");
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
          },
          { headers: { Authorization: `Bearer ${auth?.accessToken}` } }
        );

      
        websocketService.sendMessage(
          roomId,
          newMessage.trim(),
          auth?.userId,
          auth?.user
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
    deleteMessageMutation.mutate(id);
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
    <div className="relative min-h-screen w-full h-full">
      <BackgroundGlow />
      <MaxWidthWrapper className="py-10 bg-white w-full flex flex-col items-center justify-center relative">
        <div className="relative w-full max-w-2xl rounded-3xl h-[80vh] md:pb-28 p-0 pb-10 md:shadow-2xl md:px-10 z-20 flex flex-col">
          <h2 className="text-3xl   ps-5  pt-5 capitalize font-bold text-center text-primary mb-5">
            <ChevronLeft
              size={40}
              className="cursor-pointer absolute left-5 top-5"
              onClick={() => history.back()}
            />
            {roomName}
            <span className="text-sm text-gray-400 font-thin block">
              Chat Room
            </span>
          </h2>
          <ChatMessageList className="flex-grow overflow-y-auto">
            <AnimatePresence initial={false}>
              {/* key={message.id || fallback-key-${index}}
              message={message}
              isSentByUser={isSentByUser}
              handleDelete={() => handleDelete(message.id)} */}
              {messages.map((message, index) => {
                return (
                  <MessageItem
                    key={message.id || `fallback-key-${index}`}
                    message={message}
                    LoggedUser={auth.userId}
                    handleDelete={() => handleDelete(message.id)}
                  />
                );
              })}
            </AnimatePresence>
          </ChatMessageList>
        </div>

        <div className="flex z-20 w-full relative py-5 max-w-2xl mt-4">
          <ChatInput
            className="w-full !bg-white/70"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={!roomId}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ChatRoom;
