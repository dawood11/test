import AddSpeaker from "../components/speakers/AddSpeaker";
import SpeakerList from "../components/speakers/SpeakerList";
import { DataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";

const SpeakerOverviewPage = () => {
  const context = useContext(DataContext);
  const { isAuthenticated } = useAuth();

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { isLoading } = context;

  return (
    <div>
      <h1>Speakers</h1>
      {isLoading ? <p>Loading...</p> : <SpeakerList />}
      {isAuthenticated && <AddSpeaker />}
    </div>
  );
};

export default SpeakerOverviewPage;
