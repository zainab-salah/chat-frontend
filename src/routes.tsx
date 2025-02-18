import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import ChatRoomList from "./pages/ChatRoomList";
import Chat from "./pages/Chat";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
     
       
             <Route path="/chatrooms" element={
          // <ProtectedRoute>

          <ChatRoomList />
          // </ProtectedRoute>
          } />
        <Route path="/chat/:roomName" element={<Chat />} />
      </Routes>
    </Router>
  );
}
