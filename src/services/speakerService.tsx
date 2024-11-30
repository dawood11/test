const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

//Fetching the speakers list
export const getSpeakers = async () => {
  return fetch(`${API_URL}/speakers`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch speakers list!");
      }
      return response.json();
    })
    .catch((errorSpeaker) => {
      console.error(errorSpeaker);
      return [];
    });
};

//Fetching specific speaker
export const getSpecificSpeaker = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/speakers/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching the speaker with ID ${id}: ${response.statusText}`
      );
    }

    const speakerData = await response.json();
    return speakerData;
  } catch (error) {
    console.error("Failed to fetch the specific speaker!", error);
    return null;
  }
};

//creating speakers by default if there is none
export const createSpeaker = async (speakerData: any) => {
  try {
    const response = await fetch(`${API_URL}/speakers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([speakerData]),
    });

    if (!response.ok) {
      throw new Error("Failed to create speaker");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSpeaker = async (_uuid: string, speakerData: any) => {
  try {
    const response = await fetch(`${API_URL}/speakers/${_uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(speakerData),
    });

    if (!response.ok) {
      throw new Error("Failed to update speaker");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteSpeaker = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/speakers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete speaker");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
