import { getSpeakers } from "../services/speakerService";
import { Speaker } from "../context/DataContext";

export const fetchAndSetSpeakers = async (
  setSpeakers: (speakers: Speaker[]) => void
): Promise<void> => {
  try {
    const data = await getSpeakers();
    const updatedSpeakers = data.items;
    setSpeakers(updatedSpeakers);
  } catch (err) {
    console.error("Failed to fetch and set speakers:", err);
  }
};
