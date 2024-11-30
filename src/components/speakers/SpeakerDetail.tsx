// src/components/speakers/SpeakerDetail.tsx
import styles from "../../styles/speakers/SpeakerDetail.module.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Speaker } from "../../types/speakers.types";
import { getSpeakerById } from "../../services/speakers/speakers.ts";
import { DataContext } from "../../context/DataContext.ts";

const SpeakerDetail = (): JSX.Element => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const context = useContext(DataContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("SpeakerDetail must be used within a DataProvider ");
  }

  const { speakers } = context;
  const [speaker, setSpeaker] = useState<Speaker | null>(
    state?.speaker || speakers.find((sp) => sp.id === id) || null
  );

  useEffect(() => {
    if (!speaker && id) {
      const loadSpeakerDetail = async () => {
        try {
          const fetchedSpeaker = await getSpeakerById(id);
          setSpeaker(fetchedSpeaker);
        } catch (error) {
          console.error("Failed to fetch speaker details:", error);
        }
      };

      loadSpeakerDetail();
    }
  }, [id, speaker]);

  if (!speaker) {
    return <p>Foredragsholder ikke funnet</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{speaker.name || "Fant ingen navn"}</h2>
      <p className={styles.details}>Alder: {speaker.age || "Fant ingen alder"}</p>
      <p className={styles.details}>Introduksjon: {speaker.bio.introduction || "Fant ingen introduksjon"}</p>
      <p className={styles.details}>Tips: {speaker.bio.tip || "Fant ingen tips"}</p>
      <button className={styles.button} onClick={() => navigate("/speakers")}>
        Gå tilbake
      </button>
    </div>
  );
};

export default SpeakerDetail;
