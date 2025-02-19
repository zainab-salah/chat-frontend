import { Message } from "@/types";

class WebSocketService {
  private socket: WebSocket | null = null;

  connect(roomId: string, token: string, onMessage: (message: Message) => void) {
    this.socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/ws/chat/${roomId}/?token=${token}`);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.room_id && data.user && data.message) {
        onMessage({
          id: data.id,
          chatroom: data.room_id,
          user: data.user,
          content: data.message,
          timestamp: new Date(data.date).toISOString(),
          // room_id: data.room_id,
        });
      } else {
        console.warn("Unexpected WebSocket message:", data);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ message }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService();
