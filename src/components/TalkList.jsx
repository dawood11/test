import { useEffect, useState } from "react";
import { fetchTalks, fetchRooms, fetchSpeakers } from "../services/api";
import "../styles/components/TalkList.css";

function TalkList() {
  const [talks, setTalks] = useState([]);
  const [rooms, setRooms] = useState({});
  const [speakers, setSpeakers] = useState({});

  useEffect(() => {
    const getTalksRoomsAndSpeakers = async () => {
      try {
        // Fetch talks
        const talksData = await fetchTalks();
        setTalks(talksData);

        // Fetch rooms and create a map of room IDs and names
        const roomsData = await fetchRooms();
        const roomsMap = roomsData.reduce((acc, room) => {
          acc[room._id] = room.name;
          return acc;
        }, {});
        setRooms(roomsMap);

        // Fetch speakers and create a map of speaker IDs and names
        const speakersData = await fetchSpeakers();
        const speakersMap = speakersData.reduce((acc, speaker) => {
          acc[speaker._id] = speaker.name;
          return acc;
        }, {});
        setSpeakers(speakersMap);
      } catch (error) {
        console.error(
          "Feil med henting av foredrag, rom eller foredragsholdere:",
          error
        );
      }
    };

    getTalksRoomsAndSpeakers();
  }, []);

  return (
    <div className="talk-list-container">
      <ul className="talk-list">
        {talks.map((talk) => (
          <li key={talk._id} className="talk-item">
            <h2>{talk.title}</h2>
            <p>
              <strong>Dato og tid:</strong>{" "}
              {new Date(talk.time).toLocaleString()}
            </p>
            <p>
              <strong>Foredragsholder:</strong>{" "}
              {speakers[talk.speakerId] || "Ikke spesifisert"}
            </p>
            <p>
              <strong>Rom:</strong> {rooms[talk.roomId] || "Ikke spesifisert"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TalkList;
