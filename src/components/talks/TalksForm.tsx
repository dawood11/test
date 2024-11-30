// TalksForm.tsx
import styles from "../../styles/talks/TalksForm.module.css";
import { useState, useContext } from "react";
import { createTalk } from "../../services/talks/talks";
import { DataContext } from "../../context/DataContext";
import { useUser } from "../../hooks/useUser";

const TalksForm: React.FC = () => {
  const { isAdmin } = useUser();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("TalksForm must be used within a DataProvider");
  }

  const { talks, setTalks, speakers, rooms } = context;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [speakerId, setSpeakerId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [time, setTime] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedSpeaker = speakers.find((speaker) => speaker.id === speakerId);
    const speakerName = selectedSpeaker ? selectedSpeaker.name : "Unknown Speaker";

    const newTalk = {
      title,
      description,
      speakerId,
      speakerName,
      roomId,
      time,
      index: talks.length + 1,
    };

    try {
      const createdTalk = await createTalk(newTalk);
      setTalks([...talks, createdTalk]);
      setTitle("");
      setDescription("");
      setSpeakerId("");
      setRoomId("");
      setTime(undefined);
    } catch (error) {
      console.error("Error creating talk:", error);
    }
  };

  return isAdmin ? (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Navn på foredrag"
      />
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Beskrivelse"
        className={styles.textarea} 
      />
      <select
        id="room"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        required
        className={styles.select}
      >
        <option value="">Velg et rom</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
      <select
        id="speaker"
        value={speakerId}
        onChange={(e) => setSpeakerId(e.target.value)}
        required
        className={styles.select}
      >
        <option value="">Velg en foredragsholder</option>
        {speakers.map((speaker) => (
          <option key={speaker.id} value={speaker.id}>
            {speaker.name}
          </option>
        ))}
      </select>
      <input
        id="time"
        type="number"
        value={time || ""}
        onChange={(e) => setTime(e.target.value ? Number(e.target.value) : undefined)}
        placeholder="Varighet"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>Legg til foredrag</button>
    </form>
  ) : null;
};

export default TalksForm;