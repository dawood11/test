import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "../../App.css";

const RoomsList = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { rooms, talks } = context;
  const navigate = useNavigate();

  const handleRoomClick = (id: string) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className="rooms-container">
      {rooms
        .slice() // Kopi av rooms
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((room) => (
          <div
            className="liRoomItem single-room-container"
            key={room._uuid || room.name}
            onClick={() => room._uuid && handleRoomClick(room._uuid)}
            style={{ cursor: "pointer" }}
          >
            <h2>{room.name}</h2>

            <div>
              {talks
                .filter((talk) => talk.roomId === room._uuid)
                .map((talk) => (
                  <div key={talk._uuid}>
                    <p>
                      Kl {talk.time}: {talk.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
export default RoomsList;
