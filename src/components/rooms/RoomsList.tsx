// components/RoomList.tsx
import styles from "../../styles/rooms/RoomList.module.css";
import { useContext, useState } from "react";
import { Room } from "../../types/rooms.types";
import { deleteRoom } from "../../services/rooms/rooms";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import RoomEditPopup from "./RoomEditPopup";
import { useUser } from "../../hooks/useUser.ts";

const RoomList: React.FC = () => {
  const { isAdmin } = useUser();
  const context = useContext(DataContext);
  const navigate = useNavigate();
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  if (!context) {
    throw new Error("RoomList must be used within a DataProvider");
  }

  const { rooms, setRooms } = context;

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      alert("Access denied: Admin privileges required");
      return;
    }
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);

    try {
      await deleteRoom(id);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleViewDetails = (room: Room) => {
    navigate(`/rooms/${room.id}`, { state: { room } });
  };

  const openEditPopup = (room: Room) => {
    setSelectedRoom(room);
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setSelectedRoom(null);
    setEditPopupOpen(false);
  };

  const handleSave = (updatedRoom: Room) => {
    const updatedRooms = rooms.map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    setRooms(updatedRooms);
  };

  return (
    <div className={styles.container}>
      {rooms.map((room) => (
        <div key={room.id} className={styles.room}>
          <h3 className={styles.roomHeader}>
            {room.index}. {room.name}
          </h3>
          <p className={styles.roomDetails}>Beskrivelse: {room.description}</p>
          <p className={styles.roomDetails}>Kapasitet: {room.capacity}</p>
          <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.viewButton}`}
            onClick={() => handleViewDetails(room)}
          >
            Se detaljer
          </button>
          {isAdmin && (
            <>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(room.id)}
              >
                Slett
              </button>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => openEditPopup(room)}
              >
                Endre
              </button>
            </>
          )}
        </div>
        </div>
      ))}
      {isEditPopupOpen && selectedRoom && (
        <RoomEditPopup
          room={selectedRoom}
          onClose={closeEditPopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default RoomList;
