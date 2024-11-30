import AddRoom from "../components/rooms/AddRoom";
import RoomsList from "../components/rooms/RoomsList";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

const RoomOverviewPage = () => {
  const { isAuthenticated } = useAuth();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { isLoading } = context;

  return (
    <div>
      <h1>Rooms</h1>
      {isLoading ? <p>Loading...</p> : <RoomsList />}
      {isAuthenticated && <AddRoom />}
    </div>
  );
};

export default RoomOverviewPage;
