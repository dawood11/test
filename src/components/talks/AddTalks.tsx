import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { createTalk } from "../../services/TalksService";
import { fetchAndSetTalks } from "../../utils/talkUtils";

const AddTalk: React.FC = () => {
  const [newTalkTitle, setNewTalkTitle] = useState<string>("");
  const [newRoom, setNewRoom] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
  const [newSpeaker, setNewSpeaker] = useState<string>("");

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext not found");
  }
  const { talks, speakers, rooms, setTalks } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = String(newTalkTitle);
    const speakerId = String(newSpeaker);
    const roomId = String(newRoom);
    const time = String(newTime);

    if (title && speakerId && roomId && time) {
      const newTalk = { title, speakerId, roomId, time };
      try {
        await createTalk(newTalk);
        await fetchAndSetTalks(setTalks);
        setNewTalkTitle("");
        setNewRoom("");
        setNewTime("");
        setNewSpeaker("");
      } catch (error) {
        console.error("Failed to create talk:", error);
      }
    } else {
      alert("All fields are required");
    }
  };

  useEffect(() => {
    console.log(talks);
  }, [talks]);

  return (
    <div className="add-talk-form">
      <h1>Add Talk</h1>
      <form onSubmit={handleSubmit}>
        {/* Tittel */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTalkTitle}
            onChange={(e) => setNewTalkTitle(e.target.value)}
          />
        </div>
        {/* Speaker */}
        <div>
          <label htmlFor="speaker">Speaker:</label>
          <select
            id="speaker"
            value={newSpeaker}
            onChange={(e) => setNewSpeaker(e.target.value)}
          >
            <option value="" disabled>
              Select a speaker
            </option>
            {speakers.map((speaker) => (
              <option key={speaker._uuid} value={speaker._uuid}>
                {speaker.name}
              </option>
            ))}
          </select>
        </div>
        {/* Room */}
        <div>
          <label htmlFor="room">Room:</label>
          <select
            id="room"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          >
            <option value="" disabled>
              Select a room
            </option>
            {rooms.map((room) => (
              <option key={room._uuid} value={room._uuid}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        {/* Time */}
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>
        <button type="submit">Add Talk</button>
      </form>
    </div>
  );
};

export default AddTalk;

