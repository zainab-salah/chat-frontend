import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRoomList from "./pages/ChatRoomList";
import Chat from "./pages/Chat";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatrooms" element={<ChatRoomList />} />
        <Route path="/chat/:roomName" element={<Chat />} />
      </Routes>
    </Router>
  );
}
