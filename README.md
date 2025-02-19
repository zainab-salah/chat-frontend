# Chat Frontend

This repository contains the frontend for the Real-Time Chat Application project. The app allows users to join different chat rooms and communicate in real-time. It integrates with a Django backend, supporting features like WebSocket messaging, user authentication, and a simple chat interface.

## Features

- **User Authentication**: Login form to authenticate users using react Context.
- **Chat Rooms**: Join and view chat rooms, with a list of active rooms.
- **Real-Time Messaging**: Real-time message updates using WebSocket.
- **Message History**: View past messages in chat rooms.
- **Delete Functionality**: Delete messages and chat rooms.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: For type safety and better developer experience.
- **WebSockets**: For real-time communication.
- **Tailwind CSS**: For responsive, utility-first CSS.
- **React Query**: For efficient data fetching and caching.
- **React Hook From**: For forms and state handling.
- **Shadcn**: Ui lib accessible components.

## Setup Instructions

### Prerequisites

- Node.js (>=14.x)
- npm or pnpm

### Install Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/zainab-salah/chat-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd chat-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000` in your browser to view the application.

## Environment Variables

Create a `.env` file in the root of the project directory and add the following environment variables:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_WEBSOCKET_URL=ws://127.0.0.1:8000
```
## Testing Instructions

1. Create two test user accounts.
2. Log in with User A in one browser (e.g., Chrome) and with User B in another (e.g., Firefox).
3. Open the same chat room in both browsers.
4. Send messages and verify they appear in real-time in both browsers.
5. Test the delete functionality for both messages and chat rooms.
6. Delete your message or created chat room.
7. 
## Pages

- **Login/Register Form**: A simple login form for authenticating users.

  ![image](https://github.com/user-attachments/assets/3c393b09-4075-42cf-bc33-85d3ba89f707)

- **Chat Room List**: Displays a list of available chat rooms.

  <img width="1130" alt="image" src="https://github.com/user-attachments/assets/7c3c3031-74d4-410b-8d57-ad0fe41f23fe" />

- **Chat Interface**: Users can send and receive messages in real-time.

![image](https://github.com/user-attachments/assets/b9058da4-631d-4aaa-853f-cb3d028b67ee)
![image](https://github.com/user-attachments/assets/b92fdfbe-42cf-4412-a5fe-3e6b8e487d73)

