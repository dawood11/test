// src\components\talks\TalksDetail.tsx
import styles from "../../styles/talks/TalksDetail.module.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Talks } from "../../types/talks.types";
import { fetchTalksById } from "../../services/talks/talks";
import { DataContext } from "../../context/DataContext";

const TalksDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(DataContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("TalksDetail must be used within a DataProvider");
  }

  const { talks, speakers } = context;
  const [talk, setTalk] = useState<Talks | null>(
    talks.find((t) => t.id === id) || null
  );

  useEffect(() => {
    if (!talk && id) {
      const loadTalkDetail = async () => {
        try {
          const fetchedTalk = await fetchTalksById(id);
          setTalk(fetchedTalk);
        } catch (error) {
          console.error("Failed to fetch talk details:", error);
        }
      };
      loadTalkDetail();
    }
  }, [id, talk]);

  if (!talk) {
    return <p>Foredrag ikke funnet</p>;
  }

  const speaker = speakers.find((sp) => sp.id === talk.speakerId);
  const speakerName = speaker ? speaker.name : "Ukjent foredragsholder";

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{talk.title}</h2>
      <div className={styles.contentContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.details}>
            <p className={styles.label}>Foredragsholder:</p>
            <p className={styles.value}>
              {speakerName || "Ingen foredragsholder tilgjengelig"}
            </p>
          </div>
          <div className={styles.details}>
            <p className={styles.label}>Varighet:</p>
            <p className={styles.value}>
              {talk.time ? `${talk.time} timer` : "Ikke spesifisert"}
            </p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.details}>
            <p className={styles.label}>Beskrivelse:</p>
            <p className={styles.value}>
              {talk.description || "Ingen beskrivelse tilgjengelig"}
            </p>
          </div>
        </div>
      </div>
      <button className={styles.button} onClick={() => navigate(-1)}>
        Gå tilbake
      </button>
    </div>
  );
};

export default TalksDetail;
