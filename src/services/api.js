const API_KEY = "9a19b95aea4d4d818795272e801fb3f4";
const BASE_URL = `https://crudcrud.com/api/${API_KEY}`; // Husk å endre API_KEY / legge inn api key

const HEADERS = { "Content-Type": "application/json" };

//! Speaker Endpoints

export async function fetchSpeakers() {
  const response = await fetch(`${BASE_URL}/speakers`);
  if (!response.ok) {
    throw new Error("Feil ved henting av foredragsholdere..");
  }
  return response.json();
}

export async function fetchSpeakerById(id) {
  const response = await fetch(`${BASE_URL}/speakers/${id}`);
  if (!response.ok) {
    throw new Error("Feil ved henting av foredragsholder..");
  }
  return response.json();
}

export async function createSpeaker(speakerData) {
  const response = await fetch(`${BASE_URL}/speakers`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(speakerData),
  });
  if (!response.ok) {
    throw new Error("Feil ved opprettelse av foredragsholder..");
  }
  return response.json();
}

export async function updateSpeaker(id, updatedData) {
  const response = await fetch(`${BASE_URL}/speakers/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Feil ved oppdatering av foredragsholder..");
  }

  // Sjekk om responsen har innhold før parsing
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  return isJson ? await response.json() : { message: "Oppdatering vellykket" };
}

export async function deleteSpeaker(id) {
  const response = await fetch(`${BASE_URL}/speakers/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Feil ved sletting av foredragsholder..");
  }

  // Returner en standard melding for vellykket sletting
  return { message: "Sletting av foredragsholder vellykket" };
}

//! Talks Endpoints

export async function fetchTalks() {
  const response = await fetch(`${BASE_URL}/talks`);
  if (!response.ok) {
    throw new Error("Feil ved henting av foredrag..");
  }
  return response.json();
}

export async function fetchTalkById(id) {
  const response = await fetch(`${BASE_URL}/talks/${id}`);

  if (!response.ok) {
    throw new Error("Feil ved henting av foredrag..");
  }
  return response.json();
}

export async function createTalk(talkData) {
  if (!talkData.speakerId) {
    throw new Error(
      "Foredrag kan ikke opprettes uten en foredragsholder (speakerId)."
    );
  }

  const response = await fetch(`${BASE_URL}/talks`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(talkData),
  });

  if (!response.ok) {
    throw new Error("Feil ved opprettelse av foredrag..");
  }
  return response.json();
}

export async function updateTalk(id, updatedData) {
  const response = await fetch(`${BASE_URL}/talks/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Feil ved oppdatering av foredrag..");
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  return isJson ? await response.json() : { message: "Oppdatering vellykket" };
}

export async function deleteTalk(id) {
  const response = await fetch(`${BASE_URL}/talks/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Feil ved sletting av foredrag..");
  }

  // Returner en standard melding for vellykket sletting
  return { message: "Sletting av foredrag vellykket" };
}

//! Rooms Endpoints

export async function fetchRooms() {
  const response = await fetch(`${BASE_URL}/rooms`);
  if (!response.ok) {
    throw new Error("Feil ved henting av rom..");
  }
  return response.json();
}

export async function fetchRoomById(id) {
  const response = await fetch(`${BASE_URL}/rooms/${id}`);
  if (!response.ok) {
    throw new Error("Feil ved henting av rom..");
  }
  return response.json();
}

export async function createRoom(roomData) {
  const response = await fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(roomData),
  });
  if (!response.ok) {
    throw new Error("Feil ved opprettelse av rom..");
  }
  return response.json();
}

export async function updateRoom(id, updatedData) {
  const response = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Feil ved oppdatering av rom..");
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  return isJson ? await response.json() : { message: "Oppdatering vellykket" };
}

export async function deleteRoom(id) {
  const response = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error("Feil ved sletting av rom..");
  }

  // Returner en standard melding for vellykket sletting
  return { message: "Sletting av rom vellykket" };
}

export const fetchRoomsWithTalks = async () => {
  try {
    const rooms = await fetchRooms();
    const talks = await fetchTalks();

    // Kombiner rom og foredrag basert på roomId
    const roomsWithTalks = rooms.map((room) => ({
      ...room,
      talks: talks.filter((talk) => talk.roomId === room._id),
    }));

    return roomsWithTalks;
  } catch (error) {
    console.error("Feil ved henting av rom med foredrag:", error);
    throw error;
  }
};
