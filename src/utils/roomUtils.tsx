import { getRooms } from "../services/roomService";
import { Room } from "../context/DataContext";

export const fetchAndSetRooms = async (
  setRooms: (rooms: Room[]) => void
): Promise<void> => {
  try {
    const data = await getRooms(); // Hent oppdaterte rom fra API
    const updatedRooms = data.items;
    setRooms(updatedRooms); // Oppdater staten
  } catch (err) {
    console.error("Failed to fetch and set rooms:", err);
  }
};
