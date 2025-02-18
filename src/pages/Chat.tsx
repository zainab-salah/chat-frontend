import { ChatBubble , ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";

 
 
const Chat = () => {
  const messages = [
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 3,
      message: "",
      sender: "bot",
      isLoading: true,
    },
  ];
  return (
    <ChatMessageList>
      {messages.map((message) => {
        const variant = message.sender === "user" ? "sent" : "received";
        return (
          <ChatBubble key={message.id} variant={variant}>
            <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} />
            <ChatBubbleMessage isLoading={message.isLoading}>
              {message.message}
            </ChatBubbleMessage>
            {/* Action Icons */}
            {/* <ChatBubbleActionWrapper>
              
                <ChatBubbleAction
                  className="size-7"
               
                  icon={<ArrowRight className="size-4" />}
                  onClick={() =>
                    console.log(
                      "Action " 
                    )
                  }
                />
       
            </ChatBubbleActionWrapper> */}
          </ChatBubble>
        );
      })}
    </ChatMessageList>
  );
};

export default Chat;
