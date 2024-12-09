// src/API/Dashboard/PositionsAPI.ts
const BASE_URL = "https://positionhandler-544401150213.us-central1.run.app";

const request = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);
        console.log("Positions API response:", response);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
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
    const response = await request("/position", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    console.log("Positions response data: ", response);
    return response;
};