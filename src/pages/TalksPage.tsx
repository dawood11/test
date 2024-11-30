// src/pages/TalksPage.tsx
import React, { useContext, useEffect } from "react";
import { fetchTalks } from "../services/talks/talks";
import { DataContext } from "../context/DataContext";
import TalksList from "../components/talks/TalksList";
import TalksForm from "../components/talks/TalksForm";
import styles from "../styles/talks/TalksPage.module.css";
import "../styles/general/Scrollbar.css";

const TalksPage: React.FC = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("TalksPage must be used within a DataProvider");
  }

  const { talks, setTalks } = context;

  useEffect(() => {
    const loadTalks = async () => {
      try {
        const fetchedTalks = await fetchTalks();
        setTalks(fetchedTalks);
      } catch (error) {
        console.error("Error fetching talks:", error);
      }
    };

    loadTalks();
  }, [talks.length, setTalks]);

  return (
    <>
    <h1 className={styles.heading}>Talks</h1>
    <div className={styles.container}>
      <TalksForm />
      <TalksList />
    </div>
    </>
  );
};

export default TalksPage;