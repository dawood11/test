import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./TalkItem.css";
import { useContext } from "react";

const TalkList: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { talks, rooms, speakers } = context;

  return (
    <div className="talks-container">
      {talks.map((talk) => {
        const room = rooms.find((room) => room._uuid === talk.roomId);
        const speaker = speakers.find(
          (speaker) => speaker._uuid === talk.speakerId
        );

        return (
          <div 
            key={talk._uuid} 
            className="talk-item overview-talk"
            onClick={() => navigate(`/talks/${talk._uuid}`)}
            style={{ cursor: 'pointer' }}
          >
            <h2>{talk.title}</h2>
            <p>Time: {talk.time}</p>
            <p>Room: {room ? room.name : "Unknown Room"}</p>
            <p>Speaker: {speaker ? speaker.name : "Unknown Speaker"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TalkList;




