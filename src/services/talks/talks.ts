// src/services/talks.ts
import { Talks } from "../../types/talks.types";
const API_BASE_URL = import.meta.env.VITE_CRUDCRUD_ENDPOINT;
import { isAdmin } from "../auth/auth";

export const fetchTalks = async (): Promise<Talks[]> => {
  const response = await fetch(`${API_BASE_URL}/talks`);
  if (!response.ok) throw new Error("Failed to fetch talks");
  const data = await response.json();

  return data.map((talk: Talks, index: number) => ({
    id: talk._id,
    title: talk.title,
    description: talk.description,
    roomId: talk.roomId,
    speakerId: talk.speakerId,
    time: talk.time,
    index: index + 1,
  }));
};

export const fetchTalksById = async (id: string): Promise<Talks> => {
  const response = await fetch(`${API_BASE_URL}/talks/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch talk by ID: ${id}`);
  const data = await response.json();
  return {
    id: data._id,
    title: data.title,
    description: data.description,
    roomId: data.roomId,
    speakerId: data.speakerId,
    speakerName: data.speakerName,
    time: data.time,
  };
};

export const createTalk = async (
  talk: Omit<Talks, "id" | "index">
): Promise<Talks> => {
  const admin = await isAdmin();
  if (!admin) throw alert("Access denied: Admin privileges required");
  const response = await fetch(`${API_BASE_URL}/talks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(talk),
  });
  if (!response.ok) throw new Error("Failed to create talk");
  const data = await response.json();

  return {
    id: data._id,
    title: data.title,
    description: data.description,
    roomId: data.roomId,
    speakerId: data.speakerId,
    speakerName: data.speakerName,
    time: data.time,
  };
};

export const updateTalk = async (
  id: string,
  updatedTalk: Talks
): Promise<void> => {
  const admin = await isAdmin();
  if (!admin) throw alert("Access denied: Admin privileges required");
  const { id: _, index, ...sanitizedTalkData } = updatedTalk;
  const response = await fetch(`${API_BASE_URL}/talks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sanitizedTalkData),
  });
  if (!response.ok) throw new Error(`Failed to update talk with id ${id}`);
};

export const deleteTalk = async (id: string): Promise<{ message: string }> => {
  const admin = await isAdmin();
  if (!admin) throw alert("Access denied: Admin privileges required");
  const response = await fetch(`${API_BASE_URL}/talks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete talk");

  const responseText = await response.text();
  return responseText
    ? JSON.parse(responseText)
    : { message: "Talk deleted successfully" };
};
