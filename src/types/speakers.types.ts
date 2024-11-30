export interface Speaker {
  id: string;
  _id?: string;
  name: string;
  age: number | null;
  bio: {
    introduction: string;
    tip: string;
  };
  index?: number;
  username?: string;
}