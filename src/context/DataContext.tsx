import { createContext, ReactNode, useState, useEffect } from "react";
import { getRooms } from "../services/roomService";
import { getTalks } from "../services/TalksService";
import { getSpeakers } from "../services/speakerService";

export interface Room {
  _uuid?: string;
  name: string;
  capacity: number | undefined;
}

export interface Talk {
  _uuid?: string;
  title: string;
  roomId: string;
  speakerId: string;
  time: string;
}

export interface Speaker {
  _uuid?: string;
  name: string;
  biography: string;
}

export interface DataContextType {
  rooms: Room[];
  talks: Talk[];
  speakers: Speaker[];
  setRooms: (rooms: Room[]) => void;
  setTalks: (talks: Talk[]) => void;
  setSpeakers: (speakers: Speaker[]) => void;
  isLoading: boolean; //
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [talks, setTalks] = useState<Talk[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [roomsData, talksData, speakersData] = await Promise.all([
          getRooms(),
          getTalks(),
          getSpeakers(),
        ]);

        setRooms(roomsData.items);
        setTalks(talksData.items);
        setSpeakers(speakersData.items);
      } catch (err: any) {
        console.error("Error fetching data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        rooms,
        talks,
        speakers,
        setRooms,
        setTalks,
        setSpeakers,
        isLoading,
      }}
    >
      {children}
      {isLoading && <p>Loading data...</p>}
    </DataContext.Provider>
  );
};