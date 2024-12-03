import { useState, useEffect } from "react";
import { fetchSpeakers } from "../services/api";
import "../styles/components/SpeakerList.css";

const SpeakerList = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);

  useEffect(() => {
    const getSpeakers = async () => {
      try {
        setLoading(true);
        const data = await fetchSpeakers();
        setSpeakers(data || []);
      } catch (err) {
        console.error("Kunne ikke hente foredragsholdere:", err);
        setError("Kunne ikke hente foredragsholdere.");
      } finally {
        setLoading(false);
      }
    };

    getSpeakers();
  }, []);

  const handleSpeakerClick = (speakerId) => {
    setSelectedSpeakerId((prevId) => (prevId === speakerId ? null : speakerId)); // Toggle bio visibility
  };

  if (loading) return <p>Henter foredragsholdere...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="speaker-list-container">
      <ul className="speaker-list">
        {speakers.map((speaker) => (
          <li key={speaker._id} className="speaker-item">
            <span
              onClick={() => handleSpeakerClick(speaker._id)}
              className="speaker-name">
              {speaker.name}
            </span>
            {selectedSpeakerId === speaker._id && (
              <p className="speaker-item-details">
                {speaker.bio || "Ingen biografi tilgjengelig."}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpeakerList;
