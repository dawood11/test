// utils/localStorageUtils.ts
import { Room } from "../types/rooms.types";
import { Speaker } from "../types/speakers.types";
import { Talks } from "../types/talks.types";

export const saveRoomsToLocalStorage = (rooms: Room[]) => {
  localStorage.setItem("rooms", JSON.stringify(rooms));
};

export const getRoomsFromLocalStorage = (): Room[] => {
  const storedRooms = localStorage.getItem("rooms");
  return storedRooms ? JSON.parse(storedRooms) : [];
};

export const saveSpeakersToLocalStorage = (speakers: Speaker[]) => {
  localStorage.setItem("speakers", JSON.stringify(speakers) )
}

export const getSpeakersFromLocalStorage = (): Speaker[] => {
  const storedSpeakers = localStorage.getItem("speakers");
  return storedSpeakers ? JSON.parse(storedSpeakers) : [];
}

export const saveTalksToLocalStorage = (talks: Talks[]) => {
  localStorage.setItem("talks", JSON.stringify(talks));
};

export const getTalksFromLocalStorage = (): Talks[] => {
  const storedTalks = localStorage.getItem("talks");
  return storedTalks ? JSON.parse(storedTalks) : [];
};