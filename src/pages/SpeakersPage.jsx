import { useState } from "react";
import SpeakerList from "../components/SpeakerList";
import SpeakerDetail from "../components/SpeakerDetail";

const SpeakersPage = () => {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);

  // Valg av foredragsholder
  const handleSelectSpeaker = (id) => {
    setSelectedSpeakerId(id);
  };

  // Ttilbakeknapp til listen
  const handleBackToList = () => {
    setSelectedSpeakerId(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {selectedSpeakerId ? (
        <div>
          <button
            style={{
              backgroundColor: "transparent",
              color: "inherit",
              alignSelf: "flex-start",
            }}
            onClick={handleBackToList}>
            Tilbake til liste
          </button>
          <SpeakerDetail speakerId={selectedSpeakerId} />
        </div>
      ) : (
        <SpeakerList onSelectSpeaker={handleSelectSpeaker} />
      )}
    </div>
  );
};

export default SpeakersPage;
