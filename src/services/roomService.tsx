import { Room } from "../context/DataContext";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getRooms = async () => {
  return fetch(`${API_URL}/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
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

export const getRoom = async (roomId: string) => {
  return fetch(`${API_URL}/rooms/${roomId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export const createRoom = async (roomData: Room) => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([roomData]),
    });

    if (!response.ok) {
      throw new Error("Failed to create room");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateRoom = async (
  roomId: string,
  name: string,
  capacity: number
) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ name, capacity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update room");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteRoom = async (roomId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/rooms/${roomId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete room");
  }
};
