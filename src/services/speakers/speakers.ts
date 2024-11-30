import { Speaker } from "../../types/speakers.types";
const API_BASE_URL = import.meta.env.VITE_CRUDCRUD_ENDPOINT;
import { isAdmin } from "../auth/auth.ts";
import { isUserLoggedIn } from "../auth/auth.ts";

// Fetches all speakers
export const getSpeakers = async (): Promise<Speaker[]> => {
  const response = await fetch(`${API_BASE_URL}/speakers`);
  if (!response.ok)
    throw new Error(`Failed to fetch speakers: ${response.status}`);
  const data = await response.json();
  return data.map((speaker: Speaker, index: number) => ({
    id: speaker._id,
    name: speaker.name,
    age: speaker.age,
    bio: {
      introduction: speaker.bio?.introduction,
      tip: speaker.bio?.tip,
    },
    index: index + 1,
  }));
};

// Fetches specific speaker by ID
export const getSpeakerById = async (id: string): Promise<Speaker> => {
  const response = await fetch(`${API_BASE_URL}/speakers/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch speaker by ID: ${response.status}`);
  }
  const data = await response.json();
  return {
    id: data._id,
    name: data.name,
    age: data.age,
    bio: {
      introduction: data.bio?.introduction,
      tip: data.bio?.tip,
    },
  };
};

// POST - Adds new speaker
export const createSpeaker = async (
  speaker: Omit<Speaker, "id" | "index">
): Promise<Speaker> => {
  const loggedIn = await isUserLoggedIn();
  if (!loggedIn) {
    alert("You must be logged in to create a speaker.");
    throw new Error("Access denied: User not logged in");
  }
  const response = await fetch(`${API_BASE_URL}/speakers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(speaker),
  });
  if (!response.ok)
    throw new Error(`Failed to add speaker: ${response.status}`);

  const data = await response.json();
  alert("Speaker created!");
  return {
    id: data._id,
    name: data.name,
    age: data.age,
    bio: {
      introduction: data.bio?.introduction,
      tip: data.bio?.tip,
    },
  };
};

// PUT - Update speaker
export const updateSpeaker = async (
  id: string,
  updatedSpeaker: Speaker
): Promise<void> => {
  try {
    const admin = await isAdmin();
    if (!admin) throw alert("Access denied: Admin privileges required");
    const { id: _, index, ...sanitizedSpeakerData } = updatedSpeaker;

    const response = await fetch(`${API_BASE_URL}/speakers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedSpeakerData),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update speaker with id ${id}: ${response.status}`
      );
    }
    return;
  } catch (error) {
    console.error("Error updating speaker", error);
    throw error;
  }
};

// DELETE - Remove speaker by ID
export const deleteSpeaker = async (
  id: string
): Promise<{ message: string }> => {
  const admin = await isAdmin();
  if (!admin) throw alert("Access denied: Admin privileges required");
  const response = await fetch(`${API_BASE_URL}/speakers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete speaker: ${response.status}`);
  }

  const responseText = await response.text();
  return responseText
    ? JSON.parse(responseText)
    : { message: "Speaker deleted succesfully" };
};
