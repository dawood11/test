// src/pages/SpeakersPage.tsx
import { useContext, useEffect } from "react";
import { getSpeakers } from "../services/speakers/speakers.ts";
import { DataContext } from "../context/DataContext.ts";
import SpeakerList from "../components/speakers/SpeakerList";
import SpeakerForm from "../components/speakers/SpeakerForm";
import styles from "../styles/speakers/SpeakersPage.module.css";
import "../styles/general/Scrollbar.css";

const SpeakersPage: React.FC = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("SpeakersPage must be used within a DataProvider");
  }

  const { speakers, setSpeakers } = context;

  useEffect(() => {
    const loadSpeakers = async () => {
      try {
        const fetchedSpeakers = await getSpeakers();
        setSpeakers(fetchedSpeakers);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    loadSpeakers();
  }, [speakers.length, setSpeakers]);

  if (!speakers) {
    return <p>Speaker not found</p>;
  }

  return (
    <>
    <h1 className={styles.heading}>Speakers</h1>
    <div className={styles.container}>
      <SpeakerForm />
      <SpeakerList />
    </div>
    </>
  );
};

export default SpeakersPage;
