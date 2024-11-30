import { DataContext, Speaker } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SpeakerItem.css";

interface SpeakerItemProps {
  speaker: Speaker;
  onDelete: () => void;
  onEdit: () => void;
}

const SpeakerItem = ({ speaker, onDelete, onEdit }: SpeakerItemProps) => {
  const context = useContext(DataContext);
  const { isAuthenticated } = useAuth();

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { talks, rooms } = context;

  //Filter the talks that are associated with the speaker
  const getTalksForSpeaker = talks.filter(
    (talk) => talk.speakerId === speaker._uuid
  );

  const navigate = useNavigate();

  const backButton = (overview: React.MouseEvent) => {
    overview.stopPropagation();
    navigate(-1); //Hide the details
  };

  return (
    <div className="speaker-detail">
      <h2> {speaker.name || "No Name Available"}</h2>
      <p>Biography: {speaker.biography || "No biography available"}</p>
      <br />
      <h3>Talks:</h3>
      {getTalksForSpeaker.length > 0 ? (
        <ul>
          {getTalksForSpeaker.map((talk) => {
            const room = rooms.find((room) => room._uuid === talk.roomId);

            return (
              <li key={talk._uuid}>
                <strong>{talk.title}</strong> - Room:{" "}
                {room ? room.name : "Unknown Room"}, Time: {talk.time}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No talks available for this speaker.</p>
      )}
      <div className="speaker-buttons">
        {isAuthenticated && <button onClick={onEdit}>Edit</button>}
        {isAuthenticated && <button onClick={onDelete}>Delete</button>}
      </div>
      <br />
      <button onClick={backButton}>Back to overview</button>
    </div>
  );
};

export default SpeakerItem;
