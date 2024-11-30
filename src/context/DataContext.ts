// src\context\DataContext.ts
import { createContext } from "react";
import { Room } from "../types/rooms.types";
import { Speaker } from "../types/speakers.types";
import { Talks } from "../types/talks.types";

interface DataContextProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  speakers: Speaker[];
  setSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  talks: Talks[];
  setTalks: React.Dispatch<React.SetStateAction<Talks[]>>;
}

// Export only the context
export const DataContext = createContext<DataContextProps | undefined>(undefined);