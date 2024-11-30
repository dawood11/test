import { useContext, useState } from "react";
import { createSpeaker } from "../../services/speakerService";
import { DataContext } from "../../context/DataContext";
import { fetchAndSetSpeakers } from "../../utils/speakerUtils";

const AddSpeaker: React.FC = () => {
  const [newSpeakerName, setNewSpeakerName] = useState<string>("");
  const [newSpeakerBiography, setNewSpeakerBiography] = useState<string>("");

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Unable to find DataConext");
  }

  const { setSpeakers } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newSpeakerName.trim() && newSpeakerBiography.trim()) {
      const newSpeaker = {
        name: newSpeakerName,
        biography: newSpeakerBiography,
      };
      try {
        await createSpeaker(newSpeaker);
        await fetchAndSetSpeakers(setSpeakers);

        setNewSpeakerName("");
        setNewSpeakerBiography("");
      } catch (error) {
        console.error("Unable to add speaker", error);
      }
    } else {
      alert("All fields must be filled out!");
    }
  };

  return (
    <div className="add-speaker-form">
      <h2>Add Speaker</h2>
      <form action="">
        <input
          type="text"
          placeholder="Speaker name"
          value={newSpeakerName}
          onChange={(e) => setNewSpeakerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Biography"
          value={newSpeakerBiography}
          onChange={(e) => {
            setNewSpeakerBiography(e.target.value);
          }}
        />

        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Add speaker
        </button>
      </form>
    </div>
  );
};

export default AddSpeaker;
