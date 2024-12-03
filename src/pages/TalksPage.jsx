import { useEffect, useState } from "react";
import TalkList from "../components/TalkList";
import TalkDetail from "../components/TalkDetail";

const fetchTalks = async () => {
  return [
    { id: 1, title: "Talk 1", speaker: "Speaker 1" },
    { id: 2, title: "Talk 2", speaker: "Speaker 2" },
  ];
};

const fetchTalkById = async (id) => {
  return {
    id,
    title: `Foredrag ${id}`,
    speaker: `Foredragsholder ${id}`,
    description: "Info om foredraget...",
  };
};

function TalksPage() {
  const [talks, setTalks] = useState([]);
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTalks = async () => {
      try {
        const talksData = await fetchTalks();
        setTalks(talksData);
      } catch (error) {
        setError("Kunne ikke hente foredrag.", error);
        console.error(error);
      }
    };
    loadTalks();
  }, []);

  const handleSelectTalk = async (id) => {
    try {
      setLoading(true);
      const data = await fetchTalkById(id);
      setSelectedTalk(data);
      setLoading(false);
    } catch (err) {
      setError("Kunne ikke hente detaljer om foredraget.", err);
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedTalk(null);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!selectedTalk ? (
        <TalkList talks={talks} onSelectTalk={handleSelectTalk} />
      ) : (
        <TalkDetail talk={selectedTalk} onBack={handleBackToList} />
      )}
    </div>
  );
}

export default TalksPage;
