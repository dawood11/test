import { getTalks } from "../services/TalksService";
import { Talk } from "../context/DataContext";

export const fetchAndSetTalks = async (
  setTalks: (talks: Talk[]) => void
): Promise<void> => {
  try {
    const data = await getTalks();
    const updatedTalks = data.items;
    setTalks(updatedTalks);
  } catch (err) {
    console.error("Failed to fetch and set talks:", err);
  }
};
    