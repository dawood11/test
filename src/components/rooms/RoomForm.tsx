// components/RoomForm.tsx
import styles from "../../styles/rooms/RoomForm.module.css";
import { useState, useContext } from "react";
import { createRoom } from "../../services/rooms/rooms";
import { Room } from "../../types/rooms.types";
import { DataContext } from "../../context/DataContext.ts";
import { useUser } from "../../hooks/useUser.ts";

const RoomForm: React.FC = () => {
  const { isAdmin } = useUser();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("RoomForm must be used within a DataProvider");
  }

  const { rooms, setRooms } = context;
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom: Omit<Room, "id"> = {
      name,
      capacity,
      description,
      index: rooms.length + 1,
    };

    try {
      const createdRoom = await createRoom(newRoom);

      const roomWithIndex = {
        ...createdRoom,
        index: rooms.length + 1,
      };
      setRooms([...rooms, roomWithIndex]);
      setName("");
      setCapacity(null);
      setDescription("");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return isAdmin ? (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Navn på rom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Kapasitet"
        value={capacity ?? ""}
        onChange={(e) => setCapacity(parseInt(e.target.value)
        )}
        required
      />
      <textarea
        className={styles.textarea}
        placeholder="Beskrivelse"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button className={styles.button} type="submit">
        Legg til rom
      </button>
    </form>
  ) : null;
};

export default RoomForm;
