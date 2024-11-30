// TalksList.tsx
import { useContext, useState } from "react";
import { Talks } from "../../types/talks.types";
import { deleteTalk } from "../../services/talks/talks";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import TalksEditPopup from "./TalkEditPopup";
import styles from "../../styles/talks/TalksList.module.css";
import { useUser } from "../../hooks/useUser";

const TalksList: React.FC = () => {
  const { isAdmin } = useUser();
  const context = useContext(DataContext);
  const navigate = useNavigate();
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState<Talks | null>(null);

  if (!context) {
    throw new Error("TalksList must be used within a DataProvider");
  }

  const { talks, setTalks, speakers } = context;

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      alert("Access denied: Admin privileges required");
      return;
    }

    const updatedTalks = talks.filter((talk) => talk.id !== id);
    setTalks(updatedTalks);

    try {
      await deleteTalk(id);
    } catch (error) {
      console.error("Error deleting talk:", error);
    }
  };

  const handleViewDetails = (talk: Talks) => {
    navigate(`/talks/${talk.id}`, { state: { talk } });
  };

  const openEditPopup = (talk: Talks) => {
    setSelectedTalk(talk);
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setSelectedTalk(null);
    setEditPopupOpen(false);
  };

  const handleSave = (updatedTalk: Talks) => {
    const updatedTalks = talks.map((talk) =>
      talk.id === updatedTalk.id ? updatedTalk : talk
    );
    setTalks(updatedTalks);
  };

  const getSpeakerDetails = (speakerId: string) => {
    return speakers.find((s) => s.id === speakerId);
  };

  return (
    <div className={styles.container}>
      {talks.map((talk) => {
        const speaker = getSpeakerDetails(talk.speakerId);

        return (
          <div key={talk.id} className={styles.talk}>
            <h3 className={styles.talkHeader}>
              {talk.index}. {talk.title}
            </h3>
            {speaker ? (
              <div className={styles.speakerDetails}>
                <p className={styles.talkDetails}>Foredragsholder: {speaker.name}</p>
                <p className={styles.talkDetails}>Alder: {speaker.age}</p>
                <p className={styles.talkDetails}>
                  Introduksjon: {speaker.bio.introduction}
                </p>
                <p className={styles.talkDetails}>Tips: {speaker.bio.tip}</p>
              </div>
            ) : (
              <p className={styles.talkDetails}>Foredragsholder ikke funnet</p>
            )}
            <p className={styles.talkDetails}>
              Varighet: {talk.time ? `${talk.time} timer` : "Ikke spesifisert"}
            </p>
            <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.viewButton}`}
              onClick={() => handleViewDetails(talk)}
            >
              Se detaljer
            </button>
            {isAdmin && (
              <>
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => handleDelete(talk.id)}
                >
                  Slett
                </button>
                <button
                  className={`${styles.button} ${styles.editButton}`}
                  onClick={() => openEditPopup(talk)}
                >
                  Endre
                </button>
              </>
            )}
          </div>
          </div>
        );
      })}
      {isEditPopupOpen && selectedTalk && (
        <TalksEditPopup
          talk={selectedTalk}
          onClose={closeEditPopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TalksList;
