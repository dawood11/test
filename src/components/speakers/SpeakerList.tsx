// src/components/speakers/SpeakerList.tsx
import styles from "../../styles/speakers/SpeakerList.module.css";
import { useState, useContext } from "react";
import { Speaker } from "../../types/speakers.types";
import { deleteSpeaker } from "../../services/speakers/speakers";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import SpeakerEditPopup from "./SpeakerEditPopup";
import { useUser } from "../../hooks/useUser";

const SpeakerList: React.FC = () => {
  const { isAdmin } = useUser();
  const context = useContext(DataContext);
  const navigate = useNavigate();
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  if (!context) {
    throw new Error("RoomList must be used within a DataProvider");
  }

  const { speakers, setSpeakers } = context;

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      alert("Access denied: Admin privileges required");
      return;
    }

    const updatedSpeakers = speakers.filter((speaker) => speaker.id !== id);
    setSpeakers(updatedSpeakers);

    try {
      await deleteSpeaker(id);
    } catch (error) {
      console.error("Error deleting speaker:", error);
    }
  };

  const handleViewDetails = (speaker: Speaker) => {
    navigate(`/speakers/${speaker.id}`, { state: { speaker } });
  };

  const openEditPopup = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setSelectedSpeaker(null);
    setEditPopupOpen(false);
  };

  const handleSave = (updatedSpeaker: Speaker) => {
    const updatedSpeakers = speakers.map((speaker) =>
      speaker.id === updatedSpeaker.id ? updatedSpeaker : speaker
    );
    setSpeakers(updatedSpeakers);
  };

  return (
    <div className={styles.container}>
      {speakers.map((speaker) => (
        <div key={speaker.id} className={styles.speaker}>
          <h3 className={styles.speakerHeader}>
            {speaker.index}. {speaker.name}
          </h3>
          <p className={styles.speakerDetails}>Alder: {speaker.age}</p>
          <p className={styles.speakerDetails}> Introduksjon: {speaker.bio.introduction}</p>
          <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.viewButton}`}
            onClick={() => handleViewDetails(speaker)}
          >
            Se detaljer
          </button>
          {isAdmin && (
            <>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(speaker.id)}
              >
                Slett
              </button>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => openEditPopup(speaker)}
              >
                Endre
              </button>
            </>
          )}
        </div>
        </div>
      ))}
      {isEditPopupOpen && selectedSpeaker && (
        <SpeakerEditPopup
          speaker={selectedSpeaker}
          onClose={closeEditPopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SpeakerList;
