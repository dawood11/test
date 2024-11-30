import { Talk } from "../context/DataContext";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getTalks = async () => {
  return fetch(`${API_URL}/talks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch talks");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const getTalk = async (talkId: string) => {
  try {
    const response = await fetch(`${API_URL}/talks/${talkId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch talk");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTalk = async (talkData: Talk) => {
  try {
    const response = await fetch(`${API_URL}/talks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([talkData]),
    });

    if (!response.ok) {
      throw new Error("Failed to create talk");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTalk = async (
  talkId: string,
  title: string,
  speakerId: string,
  roomId: string,
  time: string
) => {
  try {
    const response = await fetch(`${API_URL}/talks/${talkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ title, speakerId, roomId, time }),
    });

    if (!response.ok) {
      throw new Error("Failed to update talk");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating talk:", error);
    return null;
  }
};

export const deleteTalk = async (talkId: string) => {
  try {
    const response = await fetch(`${API_URL}/talks/${talkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete talk");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
