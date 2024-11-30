import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, Speaker } from "../context/DataContext";
import {
  deleteSpeaker,
  getSpecificSpeaker,
  updateSpeaker,
} from "../services/speakerService";
import { fetchAndSetSpeakers } from "../utils/speakerUtils";
import SpeakerItem from "../components/speakers/SpeakerItem";

const SpeakerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Unable to find DataContext");
  }
  const { setSpeakers } = context;

  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedSpeaker, setEditedSpeaker] = useState<Speaker | null>(null);

  //Fetching specific speaker
  useEffect(() => {
    const fetchSpeaker = async () => {
      if (!id) {
        console.error("Speaker ID is unknown");
        setLoading(false);
        return;
      }
      try {
        const fetchedSpeaker = await getSpecificSpeaker(id);
        setSpeaker(fetchedSpeaker);
      } catch (err) {
        console.error("Failed to fetch the speaker");
      } finally {
        setLoading(false);
      }
    };
    fetchSpeaker();
  }, [id]);

  //Delete speaker
  const handleDelete = async () => {
    if (!speaker || !speaker._uuid) {
      console.error("Unidentified speaker");
      return;
    }

    // confirmation before deleting
    const deleteConfirmed = window.confirm(
      "Are you sure you want to delete this speaker?"
    );
    if (!deleteConfirmed) return;

    try {
      await deleteSpeaker(speaker._uuid);
      await fetchAndSetSpeakers(setSpeakers);
      navigate("/speakers");
    } catch (err) {
      console.error("Failed to delete the speaker", err);
    }
  };

  // Edit Speaker
  const handleEdit = () => {
    setEditedSpeaker(speaker);
    setIsEditing(true);
  };

  //Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedSpeaker) {
      setEditedSpeaker({
        ...editedSpeaker,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Save button for Editing
  const handleEditSave = async () => {
    if (editedSpeaker && editedSpeaker._uuid) {
      try {
        await updateSpeaker(editedSpeaker._uuid, editedSpeaker); // Update API
        await fetchAndSetSpeakers(setSpeakers); // Oppdaterer context
        setSpeaker(editedSpeaker); // Updating the speaker with the new data
        setIsEditing(false); // Exit edit mode
      } catch (err) {
        console.error("Failed to update speaker", err);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!speaker) {
    return <p>Speaker not found</p>;
  }

  return (
    <div className="speaker-container">
      {isEditing ? (
        <div className="edit-speaker-form">
          <h2>Edit Speaker</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedSpeaker?.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Biography:</label>
              <input
                type="text"
                name="biography"
                value={editedSpeaker?.biography || ""}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" onClick={handleEditSave}>
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <SpeakerItem
          speaker={speaker}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default SpeakerDetailsPage;
