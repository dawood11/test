// src\context\DataProvider.tsx
import { useState, useEffect, ReactNode, useMemo } from "react";
import { DataContext } from "./DataContext.ts";
import { fetchRooms } from "../services/rooms/rooms";
import { getSpeakers } from "../services/speakers/speakers";
import { fetchTalks } from "../services/talks/talks";
import { Room } from "../types/rooms.types";
import { Speaker } from "../types/speakers.types";
import { Talks } from "../types/talks.types";
import {
  saveRoomsToLocalStorage,
  getRoomsFromLocalStorage,
  saveSpeakersToLocalStorage,
  getSpeakersFromLocalStorage,
  saveTalksToLocalStorage,
  getTalksFromLocalStorage,
} from "../utils/localStorageUtils";

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(getRoomsFromLocalStorage() as Room[]);
  const [speakers, setSpeakers] = useState<Speaker[]>(getSpeakersFromLocalStorage() as Speaker[]);
  const [talks, setTalks] = useState<Talks[]>(getTalksFromLocalStorage() as Talks[]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (rooms.length === 0) {
          const fetchedRooms = await fetchRooms();
          setRooms(fetchedRooms);
          saveRoomsToLocalStorage(fetchedRooms);
        }
        if (speakers.length === 0) {
          const fetchedSpeakers = await getSpeakers();
          setSpeakers(fetchedSpeakers);
          saveSpeakersToLocalStorage(fetchedSpeakers);
        }
        if (talks.length === 0) {
          const fetchedTalks = await fetchTalks();
          setTalks(fetchedTalks);
          saveTalksToLocalStorage(fetchedTalks);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [rooms.length, speakers.length, talks.length]);

  const roomsWithSpeakerNames = useMemo(() => {
    if (rooms.length > 0 && speakers.length > 0) {
      return rooms.map((room) => {
        const speaker = speakers.find((sp) => sp.id === room.speakerId);
        return {
          ...room,
          speakerName: speaker ? speaker.name : "Unknown Speaker",
        };
      });
    }
    return rooms;
  }, [rooms, speakers]);

  useEffect(() => {
    saveRoomsToLocalStorage(rooms);
  }, [rooms]);

  useEffect(() => {
    saveSpeakersToLocalStorage(speakers);
  }, [speakers]);

  useEffect(() => {
    saveTalksToLocalStorage(talks);
  }, [talks]);

  return (
    <DataContext.Provider value={{ rooms: roomsWithSpeakerNames, setRooms, speakers, setSpeakers, talks, setTalks }}>
      {children}
    </DataContext.Provider>
  );
};