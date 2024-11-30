import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./SpeakerItem.css";

const SpeakerList = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { speakers } = context;
  const navigate = useNavigate();

  const handleSpeakerClick = (id: string) => {
    navigate(`/speakers/${id}`);
  };

  return (
    <div className="speaker-container">
      {speakers
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((speaker) => (
          <div
            className="speaker-detail overview-speaker"
            key={speaker._uuid || speaker.name}
            onClick={() => speaker._uuid && handleSpeakerClick(speaker._uuid)}
            style={{ cursor: "pointer" }}
          >
            <h2> {speaker.name}</h2>
            <p>Biography: {speaker.biography}</p>
          </div>
        ))}
    </div>
  );
};

export default SpeakerList;
