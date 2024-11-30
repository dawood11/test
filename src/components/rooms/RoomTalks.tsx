import { DataContext, Talk } from "../../context/DataContext";
import { useContext } from "react";

interface RoomTalksProps {
  roomId: string | undefined;
}
const RoomTalks = ({ roomId }: RoomTalksProps) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { speakers, talks } = context;

  const getTalksForRoom = (roomId: string | undefined) => {
    if (!roomId) return [];
    return talks.filter((talk) => talk.roomId === roomId);
  };

  const roomTalks = getTalksForRoom(roomId);

  return (
    <div className="talks-container">
      {roomTalks.length === 0 ? (
        <p>Ingen foredrag her foreløpig.</p>
      ) : (
        roomTalks.map((roomTalk) => {
          const speaker = speakers.find(
            (speaker) => speaker._uuid === roomTalk.speakerId
          );

          return (
            <div key={roomTalk._uuid} className="talk-item overview-talk">
              <h3>Foredrag:</h3>
              <h2>{roomTalk.title}</h2>
              <p>Time: {roomTalk.time}</p>
              <p>Speaker: {speaker ? speaker.name : "Unknown Speaker"}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RoomTalks;
