//src\pages\HomePage.tsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { Room } from "../types/rooms.types";
import { Talks } from "../types/talks.types";
import styles from "../styles/components/HomePage.module.css";

const HomePage = (): JSX.Element => {
  const context = useContext(DataContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("HomePage must be used within a DataProvider");
  }

  const { rooms, talks, speakers } = context;

  const getSpeakerName = (speakerId: string): string => {
    const speaker = speakers.find((sp) => sp.id === speakerId);
    return speaker ? speaker.name : "Unknown speaker";
  };

  const getTalksForRoom = (roomId: string): Talks[] => {
    return talks.filter((talk) => talk.roomId === roomId);
  };

  if (rooms.length === 0 || talks.length === 0) {
    return <p className={styles.loadingMessage}>Loading...</p>;
  }

  return (
  <div className={styles.mainContainer}>
    <div className={styles.container}>
      <h1 className={styles.header}>Romoversikt</h1>
      {rooms.map((room: Room) => (
        <div key={room.id} className={styles.roomCard}>
          <h2 className={styles.roomName}>{room.name}</h2>

          <p className={styles.roomDetails}>
            <strong>Kapasitet:</strong> {room.capacity}
          </p>
          <h3 className={styles.talksHeader}>Foredrag</h3>
          <div className={styles.talksContainer}>
            {getTalksForRoom(room.id).length === 0 ? (
              <p className={styles.noTalksMessage}>
                Ingen forelesninger for dette rommet
              </p>
            ) : (
              getTalksForRoom(room.id).map((talk: Talks) => (
                <div
                  key={talk.id}
                  className={styles.talkCard}
                  onClick={() =>
                    navigate(`/talks/${talk.id}`, { state: { talk } })
                  }
                >
                  <p className={styles.talkTitle}>{talk.title}</p>
                  <p className={styles.talkSpeaker}>
                    <strong>Foreleser:</strong>{" "}
                    {getSpeakerName(talk.speakerId) || "Ukjent foreleser"}
                  </p>
                  <p className={styles.talkTime}>
                    <strong>Varighet:</strong>{" "}
                    {talk.time ? `${talk.time} timer` : "Tid ikke spesifisert"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default HomePage;
