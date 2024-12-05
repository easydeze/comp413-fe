// src/API/Dashboard/PositionsAPI.ts
const BASE_URL = "https://positionshandler-544401150213.us-central1.run.app";

const request = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.status !== 204) {
      const data = await response.json();
      return data;
    }

    return null;
  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
};

export const getPositionsHttp = async (token: string) => {
  const response = await request("/positions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
