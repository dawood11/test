import { useState, useEffect } from "react";
import {
  fetchRoomsWithTalks,
  fetchRooms,
  fetchSpeakers,
  fetchTalks,
  createRoom,
  createSpeaker,
  createTalk,
  updateRoom,
  updateSpeaker,
  updateTalk,
  deleteRoom,
  deleteSpeaker,
  deleteTalk,
} from "../services/api";
import "../styles/pages/AdminPage.css";

const getUserStatus = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Bruker hentet fra localStorage:", user);
  return user && user.role === "admin";
};

const AdminPage = () => {
  const [aktivSeksjon, setAktivSeksjon] = useState("speakers"); // Aktiv seksjon
  const [speakersData, setSpeakersData] = useState([]); // Liste over foredragsholdere
  const [talksData, setTalksData] = useState([]); // Liste over foredrag
  const [roomsData, setRoomsData] = useState([]); // Liste over rom
  const [redigerElement, setRedigerElement] = useState(null); // Element som redigeres
  const [formData, setFormData] = useState({}); // Skjemadata
  const [isAdmin, setIsAdmin] = useState(false); // Sjekker om bruker er admin

  // Hent data basert på aktiv seksjon
  const fetchData = async () => {
    try {
      if (aktivSeksjon === "speakers") {
        const speakers = await fetchSpeakers();
        setSpeakersData(speakers);
        console.log("Speakers data:", speakers);
      }

      if (aktivSeksjon === "talks") {
        const talks = await fetchTalks();
        const speakers = await fetchSpeakers();
        const rooms = await fetchRooms();
        setTalksData(talks);
        setSpeakersData(speakers);
        setRoomsData(rooms);
        console.log("Talks data:", talks);
        console.log("Speakers data:", speakers);
        console.log("Rooms data:", rooms);
      }

      if (aktivSeksjon === "rooms") {
        const roomsWithTalks = await fetchRoomsWithTalks();
        setRoomsData(roomsWithTalks); // Oppdater roomsData med data
        console.log("Rooms data med foredrag:", roomsWithTalks);
      }
    } catch (error) {
      console.log("Feil ved henting av data:", error);
    }
  };

  useEffect(() => {
    const userStatus = getUserStatus();
    setIsAdmin(userStatus);
    fetchData(); // Hent data basert på aktiv seksjon
    setRedigerElement(null);
    setFormData({});
  }, [aktivSeksjon]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (aktivSeksjon === "talks" && !formData.speakerId) {
        alert("Du må velge en foredragsholder for å opprette et foredrag.");
        return;
      }
      if (redigerElement) {
        const { _id, ...dataToUpdate } = formData; // Ekskluder _id fra payload
        if (aktivSeksjon === "speakers")
          await updateSpeaker(redigerElement._id, dataToUpdate);
        if (aktivSeksjon === "talks")
          await updateTalk(redigerElement._id, dataToUpdate);
        if (aktivSeksjon === "rooms")
          await updateRoom(redigerElement._id, dataToUpdate);
      } else {
        if (aktivSeksjon === "speakers") await createSpeaker(formData);
        if (aktivSeksjon === "talks") await createTalk(formData);
        if (aktivSeksjon === "rooms") await createRoom(formData);
      }
      setFormData({});
      setRedigerElement(null);
      fetchData(); // Oppdater dataene
    } catch (error) {
      console.error("Noe gikk galt:", error);
      alert("Noe gikk galt. Vennligst prøv igjen.");
    }
  };

  const handleEdit = (item) => {
    setRedigerElement(item);
    setFormData(item);
  };

  const handleDelete = async (_id) => {
    try {
      if (aktivSeksjon === "speakers") await deleteSpeaker(_id);
      if (aktivSeksjon === "talks") await deleteTalk(_id);
      if (aktivSeksjon === "rooms") await deleteRoom(_id);
      fetchData(); // Oppdater dataene
    } catch (error) {
      console.log("Kunne ikke slette. Vennligst prøv igjen.", error);
    }
  };

  const renderForm = () => {
    if (aktivSeksjon === "speakers") {
      return (
        <form onSubmit={handleSubmit}>
          <label>Navn:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            required
          />
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
          />
          <button className="button-spacing" type="submit">
            {redigerElement ? "Oppdater" : "Legg til"}
          </button>
        </form>
      );
    } else if (aktivSeksjon === "talks") {
      return (
        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <label>Tittel:</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            required
          />
          <label>Foredragsholder:</label>
          <select
            name="speakerId"
            value={formData.speakerId || ""}
            onChange={handleInputChange}
            required>
            <option value="">Velg en foredragsholder</option>
            {speakersData.map((speaker) => (
              <option key={speaker._id} value={speaker._id}>
                {speaker.name}
              </option>
            ))}
          </select>
          <label>Rom:</label>
          <select
            name="roomId"
            value={formData.roomId || ""}
            onChange={handleInputChange}>
            <option value="">Velg et rom</option>
            {roomsData.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name || "Ukjent rom"}
              </option>
            ))}
          </select>
          <label>Tidspunkt:</label>
          <input
            type="datetime-local"
            name="time"
            value={formData.time || ""}
            onChange={handleInputChange}
          />
          <button className="button-spacing" type="submit">
            {redigerElement ? "Oppdater" : "Legg til"}
          </button>
        </form>
      );
    } else if (aktivSeksjon === "rooms") {
      return (
        <form onSubmit={handleSubmit}>
          <label>Romnavn:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            required
          />
          <label>Kapasitet:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity || ""}
            onChange={handleInputChange}
          />
          <button className="button-spacing" type="submit">
            {redigerElement ? "Oppdater" : "Legg til"}
          </button>
        </form>
      );
    }
  };

  const renderList = () => {
    if (aktivSeksjon === "speakers") {
      return speakersData.map((item) => (
        <li style={{ listStyleType: "none", textAlign: "left" }} key={item._id}>
          <strong>{item.name}</strong> - {item.bio || "Ingen bio"}
          <div style={{ textAlign: "left" }}>
            <button className="button-spacing" onClick={() => handleEdit(item)}>
              Rediger
            </button>
            <button
              className="button-spacing"
              onClick={() => handleDelete(item._id)}>
              Slett
            </button>
          </div>
        </li>
      ));
    }

    if (aktivSeksjon === "talks") {
      return talksData.map((item) => {
        const speaker = speakersData.find((s) => s._id === item.speakerId);
        const room = roomsData.find((r) => r._id === item.roomId);

        return (
          <li
            style={{ listStyleType: "none", textAlign: "left" }}
            key={item._id}>
            <strong>{item.title}</strong> - Tid:{" "}
            {item.time || "Ingen tidspunkt"}
            <br />
            {speaker
              ? `Foredragsholder: ${speaker.name}`
              : "Ingen foredragsholder valgt"}
            <br />
            {room ? `Rom: ${room.name}` : "Ingen rom valgt"}
            <br />
            <button className="button-spacing" onClick={() => handleEdit(item)}>
              Rediger
            </button>
            <button
              className="button-spacing"
              onClick={() => handleDelete(item._id)}>
              Slett
            </button>
          </li>
        );
      });
    }

    if (aktivSeksjon === "rooms") {
      return roomsData.map((room) => (
        <li style={{ listStyleType: "none", textAlign: "left" }} key={room._id}>
          <strong>{room.name}</strong> - Kapasitet: {room.capacity || "Ukjent"}
          <br />
          {room.talks?.length > 0 ? (
            <ul>
              {room.talks.map((talk) => (
                <li key={talk._id}>
                  {talk.title} - Tid: {talk.time || "Ingen tidspunkt"}
                </li>
              ))}
            </ul>
          ) : (
            <em>Ingen foredrag planlagt</em>
          )}
          <button className="button-spacing" onClick={() => handleEdit(room)}>
            Rediger
          </button>
          <button
            className="button-spacing"
            onClick={() => handleDelete(room._id)}>
            Slett
          </button>
        </li>
      ));
    }
    return null;
  };

  if (!isAdmin) {
    return <p>Du har ikke tilgang til admin-siden. Du må være admin.</p>;
  }

  return (
    <div>
      <nav>
        <button
          className="button-admin"
          onClick={() => setAktivSeksjon("speakers")}>
          Foredragsholdere
        </button>
        <button
          className="button-admin"
          onClick={() => setAktivSeksjon("talks")}>
          Foredrag
        </button>
        <button
          className="button-admin"
          onClick={() => setAktivSeksjon("rooms")}>
          Rom
        </button>
      </nav>
      <hr />
      <div style={{ paddingInlineStart: "40px" }}>
        <h3>
          {aktivSeksjon === "speakers"
            ? "Foredragsholdere"
            : aktivSeksjon === "talks"
            ? "Foredrag"
            : "Rom"}
        </h3>
        <ul style={{ textAlign: "left" }}>{renderList()}</ul>
      </div>
      <hr />
      {renderForm()}
    </div>
  );
};

export default AdminPage;
