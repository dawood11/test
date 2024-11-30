// src/components/speakers/SpeakerForm.tsx
import styles from "../../styles/speakers/SpeakerForm.module.css";
import { useState, useContext } from "react";
import { createSpeaker } from "../../services/speakers/speakers";
import { DataContext } from "../../context/DataContext";
import { useUser } from "../../hooks/useUser";

const SpeakerForm: React.FC = () => {
  const { isLoggedIn } = useUser();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("SpeakerForm must be used within a DataProvider");
  }

  const { speakers, setSpeakers } = context;
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [introduction, setIntroduction] = useState("");
  const [tip, setTip] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSpeaker = { name, age, bio: { introduction, tip } };

    try {
      const createdSpeaker = await createSpeaker(newSpeaker);
      const updatedSpeakers = [
        ...speakers,
        { ...createdSpeaker, index: speakers.length + 1 },
      ];
      setSpeakers(updatedSpeakers);
      setName("");
      setAge(1);
      setIntroduction("");
      setTip("");
    } catch (error) {
      console.error("Error creating speaker:", error);
    }
  };

  return isLoggedIn ? (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Navn på foredragsholder"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Alder"
        value={age ?? ""}
        onChange={(e) => setAge(parseInt(e.target.value))}
        required
      />
      <textarea
        className={styles.textarea}
        placeholder="Introduksjon"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        required
      ></textarea>
      <textarea
        className={styles.textarea}
        placeholder="Tips"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        required
      ></textarea>
      <button className={styles.button} type="submit">
        Legg til foredragsholder
      </button>
    </form>
  ) : null;
};
export default SpeakerForm;
