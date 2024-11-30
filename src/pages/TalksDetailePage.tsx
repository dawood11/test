import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext, Talk } from "../context/DataContext";
import TalkItem from "../components/talks/TalkItem";
import { deleteTalk, getTalk, updateTalk } from "../services/TalksService";
import { fetchAndSetTalks } from "../utils/talkUtils";
import EditTalk from "../components/talks/EditTalks";

const TalksDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext not found!");

  const { setTalks } = context;

  const [talk, setTalk] = useState<Talk | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTalk = async () => {
      if (!id) {
        console.error("Talk ID is missing");
        setLoading(false);
        return;
      }
      try {
        const fetchedTalk = await getTalk(id);
        setTalk(fetchedTalk);
      } catch (err) {
        console.error("Failed to fetch talk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTalk();
  }, [id]);

  const handleDelete = async () => {
    if (!talk || !talk._uuid) {
      console.error("Talk is missing or does not have an ID.");
      return;
    }
    try {
      await deleteTalk(talk._uuid);
      await fetchAndSetTalks(setTalks);
      navigate("/talks");
    } catch (err) {
      console.error("Failed to delete talk:", err);
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedTalk: Talk) => {
    if (!updatedTalk._uuid) return;
    try {
      await updateTalk(
        updatedTalk._uuid,
        updatedTalk.title,
        updatedTalk.speakerId,
        updatedTalk.roomId,
        updatedTalk.time
      ); // Oppdaterer API
      await fetchAndSetTalks(setTalks); // Oppdaterer context
      setTalk(updatedTalk);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update talk:", error);
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : talk ? (
        <div className="single-talk-container">
          {isEditing ? (
            <EditTalk
              talk={talk}
              onClose={handleCloseEdit}
              onUpdate={handleUpdate}
            />
          ) : (
            <TalkItem
              talk={talk}
              onDelete={handleDelete}
              onEdit={handleStartEdit}
            />
          )}
        </div>
      ) : (
        <p>No talk found</p>
      )}
    </div>
  );
};

export default TalksDetailPage;
