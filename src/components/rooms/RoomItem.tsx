import { Room } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RoomItem.css";
import RoomTalks from "./RoomTalks";

interface RoomItemProps {
  room: Room;
  onDelete: () => void;
  onEdit: () => void;
}

const RoomItem = ({ room, onDelete, onEdit }: RoomItemProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="liRoomItem">
      <div className="room-details">
        <h2>Rom: {room.name}</h2>
        <p>Kapasitet: {room.capacity}</p>

        <RoomTalks roomId={room._uuid} />
      </div>
      {isAuthenticated && (
        <div className="room-buttons">
          <button onClick={onEdit}>Edit room</button>
          <button onClick={onDelete}>Delete room</button>
        </div>
      )}

      <button onClick={() => navigate(-1)}>Back to overview</button>
    </div>
  );
};

export default RoomItem;
