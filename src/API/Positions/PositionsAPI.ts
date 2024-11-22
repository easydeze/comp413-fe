const BASE_URL = ""; // Add your positions API endpoint

export const getPositions = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/positions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch positions:", error);
    throw error;
  }
};
