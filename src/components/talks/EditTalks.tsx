import { useState, useContext } from "react";
import { DataContext, Talk } from "../../context/DataContext";
import "./talkItem.css";

interface EditTalkProps {
  talk: Talk;
  onClose: () => void;
  onUpdate: (updatedTalk: Talk) => Promise<void>;
}

const EditTalk: React.FC<EditTalkProps> = ({ talk, onClose, onUpdate }) => {
  const [editedTitle, setEditedTitle] = useState(talk.title);
  const [editedRoom, setEditedRoom] = useState(talk.roomId);
  const [editedTime, setEditedTime] = useState(talk.time);
  const [editedSpeaker, setEditedSpeaker] = useState(talk.speakerId);

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext not found");
  }
  const { rooms, speakers } = context;

  // src/components/talks/EditTalks.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!talk._uuid) return;

    try {
      const updatedTalk = {
        ...talk,
        title: editedTitle,
        roomId: editedRoom,
        speakerId: editedSpeaker,
        time: editedTime,
      };

      await onUpdate(updatedTalk); //handleUpdate i talksDetailPage.tsx
    } catch (error) {
      console.error("Failed to update talk:", error);
    }
  };

  return (
    <div>
      <h2>Edit Talk</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="speaker">Speaker:</label>
          <select
            id="speaker"
            value={editedSpeaker}
            onChange={(e) => setEditedSpeaker(e.target.value)}
          >
            {speakers.map((speaker) => (
              <option key={speaker._uuid} value={speaker._uuid}>
                {speaker.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="room">Room:</label>
          <select
            id="room"
            value={editedRoom}
            onChange={(e) => setEditedRoom(e.target.value)}
          >
            {rooms.map((room) => (
              <option key={room._uuid} value={room._uuid}>
                {room.name} (Capacity: {room.capacity})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
          />
        </div>
        <div className="talk-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTalk;
