// TalksEditPopup.tsx
import styles from "../../styles/talks/TalkEditPopup.module.css";
import { useState, useEffect, useContext } from "react";
import { Talks } from "../../types/talks.types";
import { updateTalk } from "../../services/talks/talks";
import { DataContext } from "../../context/DataContext";
import { Speaker } from "../../types/speakers.types";

interface TalksEditPopupProps {
  talk: Talks;
  onClose: () => void;
  onSave: (updatedTalk: Talks) => void;
}

const TalksEditPopup: React.FC<TalksEditPopupProps> = ({ talk, onClose, onSave }) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("TalksEditPopup must be used within a DataProvider");
  }

  const { speakers, rooms } = context;
  const [editedTalk, setEditedTalk] = useState<Talks>(talk);

  useEffect(() => {
    setEditedTalk(talk);
  }, [talk]);

  const handleSave = async () => {
    try {
      await updateTalk(editedTalk.id, editedTalk);
      onSave(editedTalk);
      onClose();
    } catch (error) {
      console.error("Error updating talk:", error);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupContainer}>
        <h2>Endre informasjon om foredrag</h2>
        <label>
          Navn på foredrag
          <input
            type="text"
            value={editedTalk.title}
            onChange={(e) => setEditedTalk({ ...editedTalk, title: e.target.value })}
          />
        </label>
        <label>
          Beskrivelse:
          <textarea
            value={editedTalk.description || ""}
            onChange={(e) => setEditedTalk({ ...editedTalk, description: e.target.value })}
          />
        </label>
        <label>
          Velg et rom:
          <select
            value={editedTalk.roomId || ""}
            onChange={(e) => setEditedTalk({ ...editedTalk, roomId: e.target.value })}
          >
            <option value="">Velg et rom</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Velg en foredragsholder:
          <select
            value={editedTalk.speakerId}
            onChange={(e) => setEditedTalk({ ...editedTalk, speakerId: e.target.value })}
          >
            <option value="">Velg en foredragsholder</option>
            {speakers.map((speaker: Speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Varighet i timer:
          <input
            type="number"
            value={editedTalk.time || ""}
            onChange={(e) => setEditedTalk({ ...editedTalk, time: parseInt(e.target.value, 10) })}
          />
        </label>
        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} onClick={handleSave}>
            Lagre
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Avbryt
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TalksEditPopup;