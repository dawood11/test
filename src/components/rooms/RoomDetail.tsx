//src\components\rooms\RoomDetail.tsx
import styles from "../../styles/rooms/RoomDetail.module.css";
import { useEffect, useState, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Room } from "../../types/rooms.types.ts";
import { fetchRoomById } from "../../services/rooms/rooms.ts";
import { DataContext } from "../../context/DataContext.ts";

const RoomDetail = (): JSX.Element => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const context = useContext(DataContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("RoomDetail must be used within a DataProvider ");
  }

  const { rooms, talks, speakers } = context;
  const [room, setRoom] = useState<Room | null>(
    state?.room || rooms.find((r) => r.id === id) || null
  );

  useEffect(() => {
    if (!room && id) {
      const loadRoomDetail = async () => {
        try {
          const fetchedRoom = await fetchRoomById(id);
          setRoom(fetchedRoom);
        } catch (error) {
          console.error("Failed to fetch room details:", error);
        }
      };

      loadRoomDetail();
    }
  }, [id, room]);

  if (!room) {
    return <p>Rom ikke funnet</p>;
  }

  const roomTalks = talks.filter((talk) => talk.roomId === room.id);

  const getSpeakerName = (speakerId: string): string => {
    const speaker = speakers.find((sp) => sp.id === speakerId);
    return speaker ? speaker.name : "Ukjent foredragsholder";
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{room.name}</h2>
      <p className={styles.details}>Beskrivelse: {room.description}</p>
      <p className={styles.details}>Kapasitet: {room.capacity}</p>
      <h3 className={styles.talksHeader}>Foredrag for dette rommet</h3>
      {roomTalks.length > 0 ? (
        roomTalks.map((talk) => (
          <div key={talk.id} className={styles.talksContainer}
          onClick={() =>
            navigate(`/talks/${talk.id}`, { state: { talk } })
          }>
            <div className={styles.talkCard}>
              <p className={styles.talkTitle}>
                <strong>{talk.title || "Fant ingen tittel"}</strong> 
              </p>
              <p className={styles.talkSpeaker}>
                <strong>Foredragsholder: </strong>
                {getSpeakerName(talk.speakerId) || "Fant ingen foredragsholder"}
              </p>
              <p className={styles.talkTime}>
                <strong>Varighet: </strong>
                {talk.time ? `${talk.time} timer` : "Fant ingen varighet"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noTalksMessage}>
          Det finnes ingen foredrag for dette rommet
        </p>
      )}
      <button className={styles.button} onClick={() => navigate("/rooms")}>
        Go Back
      </button>
    </div>
  );
};

export default RoomDetail;
