// src/components/speakers/SpeakerEditPopup.tsx
import styles from "../../styles/speakers/SpeakerEditPopup.module.css";
import { useState, useEffect } from "react";
import { Speaker } from "../../types/speakers.types";
import { updateSpeaker } from "../../services/speakers/speakers";

interface SpeakerEditPopupProps {
  speaker: Speaker;
  onClose: () => void;
  onSave: (updatedSpeaker: Speaker) => void;
}

const SpeakerEditPopup: React.FC<SpeakerEditPopupProps> = ({
  speaker,
  onClose,
  onSave,
}) => {
  const [editedSpeaker, setEditedSpeaker] = useState<Speaker>(speaker);

  useEffect(() => {
    setEditedSpeaker(speaker);
  }, [speaker]);

  const handleSave = async () => {
    try {
      await updateSpeaker(editedSpeaker.id, editedSpeaker);
      onSave(editedSpeaker);
      onClose();
    } catch (error) {
      console.error("Error updating speaker:", error);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
      <div className={styles.popupContainer}>
        <h2>Endre foredragsholder info</h2>
        <label>
          Navn:
          <input
            type="text"
            value={editedSpeaker.name}
            onChange={(e) =>
              setEditedSpeaker({ ...editedSpeaker, name: e.target.value })
            }
          />
        </label>
        <label>
          Alder:
          <input
            type="number"
            value={editedSpeaker.age ?? ""}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                age: parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        <label>
          Introduksjon:
          <textarea
            value={editedSpeaker.bio.introduction}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                bio: { ...editedSpeaker.bio, introduction: e.target.value },
              })
            }
          />
        </label>
        <label>
          Tips:
          <textarea
            value={editedSpeaker.bio.tip}
            onChange={(e) =>
              setEditedSpeaker({
                ...editedSpeaker,
                bio: { ...editedSpeaker.bio, tip: e.target.value },
              })
            }
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

export default SpeakerEditPopup;
