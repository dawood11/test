import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, Room } from "../context/DataContext";
import RoomItem from "../components/rooms/RoomItem";
import { deleteRoom, getRoom, updateRoom } from "../services/roomService";
import { fetchAndSetRooms } from "../utils/roomUtils";

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Context
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Finner ikke DataContext");
  }
  const { setRooms } = context;

  // Lokal state for rom
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hent rom
  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) {
        console.error("Room ID is missing");
        setLoading(false);
        return;
      }
      try {
        const fetchedRoom = await getRoom(id);
        setRoom(fetchedRoom);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  //Slett rom
  const handleDelete = async () => {
    if (!room || !room._uuid) {
      console.error("Room is missing or does not have an ID.");
      return;
    }
    try {
      await deleteRoom(room._uuid); // Slett rommet fra API
      await fetchAndSetRooms(setRooms); // Oppdater rooms-staten
      navigate("/rooms");
    } catch (err) {
      console.error("Failed to delete room:", err);
    }
  };

  //Rediger rom
  const handleEdit = async () => {
    if (!room || !room._uuid) {
      console.error("Room is missing or does not have an ID.");
      return;
    }

    const newName = window.prompt("Enter new name:", room.name);
    const newCapacity = window.prompt(
      "Enter new capacity:",
      String(room.capacity)
    );

    if (!room._uuid) {
      console.error("Room ID is missing.");
      return;
    }

    if (newName && newCapacity && !isNaN(Number(newCapacity))) {
      try {
        await updateRoom(room._uuid, newName, Number(newCapacity)); // Oppdater API
        await fetchAndSetRooms(setRooms); // Oppdater DataContext
        // Hent oppdatert rom fra API
        const updatedRoom = await getRoom(room._uuid);
        setRoom(updatedRoom); // Oppdater det lokale room-state
      } catch (err) {
        console.error("Failed to update room:", err);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!room) {
    return <p>Room not found</p>;
  }

  return (
    <div className="single-rooms-container">
      <RoomItem room={room} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default RoomDetailsPage;
