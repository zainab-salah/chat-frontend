import { Message } from "@/types";

class WebSocketService {
  private socket: WebSocket | null = null;

  connect(
    roomId: string,
    token: string,
    onMessage: (message: Message) => void
  ) {
    if (!token) {
      console.error("❌ WebSocket connection failed: No token provided");
      return;
    }

    console.log(`🔌 Connecting WebSocket with token: ${token}`);

    this.socket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL}/ws/chat/${roomId}/?token=${token}`
    );

    this.socket.onopen = () => {
      console.log("✅ WebSocket connection established.");
    };

    this.socket.onmessage = (event) => {
      console.log("📩 WebSocket message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.room_id && data.user && data.message) {
          onMessage({
            id: data.id,
            chatroom: data.room_id,
            user: data.userId,
            content: data.message,
            timestamp: new Date(data.date).toISOString(),
          });
        } else {
          console.warn("⚠️ Unexpected WebSocket message format:", data);
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    this.socket.onclose = (event) => {
      console.warn(
        `🔴 WebSocket closed: Code ${event.code}, Reason: ${event.reason}`
      );

      // Auto-reconnect if disconnected
      if (!event.wasClean) {
        console.log("🌀 Attempting to reconnect WebSocket...");
        setTimeout(() => this.connect(roomId, token, onMessage), 3000);
      }
    };

    this.socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };
  }
  sendMessage(room_id: string, message: string, userId: string, username: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("📤 Sending WebSocket message:", { room_id, message, userId, username });
  
      this.socket.send(JSON.stringify({ room_id, message, user_id: userId, username })); 
    } else {
      console.warn("⚠️ WebSocket is not open, message not sent.");
    }
  }
  
  

  disconnect() {
    if (this.socket) {
      console.log("🔌 Closing WebSocket connection...");
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService();
