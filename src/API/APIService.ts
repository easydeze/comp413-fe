// This should be the url of backend or api gateway
const BASE_URL = "https://your-backend-api.com";

// Helper function to handle requests
const request = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);

        // Check if the response is okay (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If the response is not empty, parse JSON
        if (response.status !== 204) {
            const data = await response.json();
            return data;
        }

        return null; // No content to return
    } catch (error) {
        console.error("API request failed", error);
        throw error;
    }
};

// Function to send login request
export const login = async (username: string, password: string) => {
    const response = await request("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Body yet to be modified
        body: JSON.stringify({ username, password }),
    });

    return response;
};

export const getUserProfile = async (userId: string) => {
    const response = await request(`/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};
//
export const BuySell = async (userId: string, OTHER_THINGSY: string) => {
    const response = await request(`/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};