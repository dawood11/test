//components/RoomEditPopup.tsx
import styles from "../../styles/rooms/RoomEditPopup.module.css";
import { useState, useEffect, useContext } from "react";
import { Room } from "../../types/rooms.types";
import { updateRoom } from "../../services/rooms/rooms.ts";
import { DataContext } from "../../context/DataContext.ts";
// import { Speaker } from "../../types/speakers.types.ts";

interface RoomEditPopupProps {
  room: Room;
  onClose: () => void;
  onSave: (updatedRoom: Room) => void;
}

const RoomEditPopup: React.FC<RoomEditPopupProps> = ({
  room,
  onClose,
  onSave,
}) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("RoomEditPopup must be used within a DataProvider");
  }

  // const { speakers } = context;
  const [editedRoom, setEditedRoom] = useState<Room>(room);

  useEffect(() => {
    setEditedRoom(room);
  }, [room]);

  const handleSave = async () => {
    try {
      await updateRoom(editedRoom.id, editedRoom);
      onSave(editedRoom);
      onClose();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
      <div className={styles.popupContainer}>
        <h2>Edit Room Information</h2>
        <label>
          Room Name:
          <input
            type="text"
            value={editedRoom.name}
            onChange={(e) =>
              setEditedRoom({ ...editedRoom, name: e.target.value })
            }
          />
        </label>
        <label>
          Capacity:
          <input
            type="number"
            value={editedRoom.capacity ?? ""}
            onChange={(e) =>
              setEditedRoom({
                ...editedRoom,
                capacity: parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <label>
          Description:
          <textarea
            value={editedRoom.description}
            onChange={(e) =>
              setEditedRoom({ ...editedRoom, description: e.target.value })
            }
          />
        </label>
        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomEditPopup;
