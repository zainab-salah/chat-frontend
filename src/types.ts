export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface AuthResponse {
    user: User;
    tokens: {
      refresh: string;
      access: string;
    };
  }
  
  export interface ChatRoom {
    id: number;
    name: string;
    created_at: string;
  }
  
  export interface WebSocketMessage {
    message: string;
    username: string;
    roomName: string;
    timestamp?: string; 
  }
  
  export interface Message {
    id: number;
    user: string;
    chatroom: string;
    content: string;
    timestamp?: Date;
  }
  