//src\types\rooms.types.ts
export interface Room {
  id: string;
  _id?: string;
  name: string;
  capacity: number | null;
  description: string;
  speakerId?: string;
  speakerName?: string;
  index?: number;
}
