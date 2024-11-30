// src/services/rooms.ts
import { isAdmin } from "../auth/auth.ts";
const API_BASE_URL = import.meta.env.VITE_CRUDCRUD_ENDPOINT;
import { Room } from "../../types/rooms.types";

export const fetchRooms = async (): Promise<Room[]> => {
  const response = await fetch(`${API_BASE_URL}/rooms`);
  if (!response.ok) throw new Error("Failed to fetch rooms");
  const data = await response.json();
  return data.map((room: Room, index: number) => ({
    id: room._id,
    speakerId: room.speakerId,
    speakerName: room.speakerName,
    name: room.name,
    capacity: room.capacity,
    description: room.description,
    index: index + 1,
  }));
};

export const fetchRoomById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/rooms/${id}`);
  if (!response.ok) throw new Error("Failed to fetch room details");
  const data = await response.json();
  return {
    id: data._id,
    speakerId: data.speakerId,
    speakerName: data.speakerName,
    name: data.name,
    capacity: data.capacity,
    description: data.description,
  };
};

export const createRoom = async (
  room: Omit<Room, "id" | "index">
): Promise<Room> => {
  const admin = await isAdmin();
  if (!admin) throw alert("Access denied: Admin privileges required");

  const response = await fetch(`${API_BASE_URL}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });
  if (!response.ok) throw new Error("Failed to create room");
  const data = await response.json();
  return {
    id: data._id,
    speakerId: data.speakerId,
    speakerName: data.speakerName,
    name: data.name,
    capacity: data.capacity,
    description: data.description,
  };
};

export const updateRoom = async (
  id: string,
  updatedRoom: Room
): Promise<void> => {
  try {
    const admin = await isAdmin();
    if (!admin) throw alert("Access denied: Admin privileges required");
    const { id: _, index, ...sanitizedRoomData } = updatedRoom;
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedRoomData),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update room with id ${id}: ${response.statusText}`
      );
    }
    return;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteRoom = async (id: string): Promise<{ message: string }> => {
  const admin = await isAdmin();
  if (!admin) throw alert("Access denied: Admin privileges required");
  const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete room");

  const responseText = await response.text();
  return responseText
    ? JSON.parse(responseText)
    : { message: "Room deleted succesfully" };
};
