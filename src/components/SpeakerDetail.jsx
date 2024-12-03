import { useState, useEffect } from "react";
import { fetchSpeakerById } from "../services/api";
import "../styles/components/SpeakerDetail.css";
import PropTypes from "prop-types";

const SpeakerDetail = ({ speakerId }) => {
  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSpeakerDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchSpeakerById(speakerId);
        setSpeaker(data);
      } catch (err) {
        console.error("Kunne ikke finne foredragsholdere", err);
        setError("Kunne ikke hente foredragsholder.");
      } finally {
        setLoading(false);
      }
    };

    getSpeakerDetails();
  }, [speakerId]);

  if (loading) return <p>Henter foredragsholdere...</p>;
  if (error) return <p>{error}</p>;
  if (!speaker) return <p>Ingen foredragsholder funnet...</p>;

  return (
    <div className="speaker-detail">
      <h2>{speaker.name}</h2>
      <p>{speaker.bio}</p>
    </div>
  );
};

SpeakerDetail.propTypes = {
  speakerId: PropTypes.string.isRequired,
};

export default SpeakerDetail;
