// pages/RoomsPage.tsx
import { useContext, useEffect } from "react";
import { fetchRooms } from "../services/rooms/rooms";
import { DataContext } from "../context/DataContext";
import RoomList from "../components/rooms/RoomsList";
import RoomForm from "../components/rooms/RoomForm";
import styles from "../styles/rooms/RoomsPage.module.css";
import "../styles/general/Scrollbar.css";

const RoomsPage: React.FC = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("RoomsPage must be used within a DataProvider");
  }

  const { rooms, setRooms } = context;

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const fetchedRooms = await fetchRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    loadRooms();
  }, [rooms.length, setRooms]);

  if (!rooms) {
    return <p>Foreleser ikke funnet</p>;
  }

  return (
    <>
      <h1 className={styles.heading}>Rooms</h1>
        <div className={styles.container}>
        <RoomForm />
        <RoomList />
        </div>
    </>
  );
};

export default RoomsPage;
