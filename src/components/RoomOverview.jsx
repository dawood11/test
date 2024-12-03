import { useState, useEffect } from "react";
import { fetchTalks, fetchRooms } from "../services/api";
import PropTypes from "prop-types";
import "../styles/components/RoomOverview.css";

const RoomOverview = ({ isLoggedIn }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const [roomData, talkData] = await Promise.all([
          fetchRooms(),
          fetchTalks(),
        ]);

        const roomsWithTalks = roomData.map((room) => ({
          ...room,
          talks: talkData.filter((talk) => talk.roomId === room._id),
        }));

        setRooms(roomsWithTalks);
        setLoading(false);
      } catch (err) {
        setError(`Kunne ikke hente rom: ${err.message}`);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  if (!isLoggedIn) {
    return <p>Du må være logget inn for å se romoversikten</p>;
  }

  if (loading) return <p>Laster inn rom...</p>;

  if (error) return <p>En feil har oppstått: {error}</p>;

  return (
    <div className="room-overview-container">
      {rooms.length === 0 ? (
        <p>Ingen rom tilgjengelig</p>
      ) : (
        <div className="room-list">
          {rooms.map((room) => (
            <div key={room._id} className="room-item">
              <h2>{room.name}</h2>
              <p>Romkapasitet: {room.capacity}</p>
              <h4>Planlagte foredrag:</h4>
              {room.talks && room.talks.length > 0 ? (
                <ul>
                  {room.talks.map((talk) => (
                    <li key={talk._id}>
                      <strong>{talk.title}</strong> at {talk.time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Ingen foredrag planlagt</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

RoomOverview.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default RoomOverview;
