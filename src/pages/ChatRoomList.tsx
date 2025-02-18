import { useContext, useEffect } from "react";
 
import { api } from "@/services/api";
import { AuthContext } from "@/context/AuthContext";
 
const ChatRooms: React.FC = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log("Current accessToken in ChatRooms:", auth?.accessToken);
  }, [auth?.accessToken]);

  const fetchList = async () => {
    if (!auth?.accessToken) {
      console.error("No access token available, cannot fetch chat rooms.");
      return;
    }

    try {
      const response = await api.get("/chatrooms/");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  };

  return (
    <div>
      <h2>Active Chat Rooms</h2>
      <button onClick={fetchList}>Fetch Chat Rooms</button>
    </div>
  );
};

export default ChatRooms;
