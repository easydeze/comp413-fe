// This should be the url of backend or api gateway

// Now the url not the sample cloud run function but the specific handler for login specifically!
const BASE_URL = "https://loginhandler-544401150213.us-central1.run.app";
// Helper function to handle requests
const request = async (url: string, options: RequestInit) => {
    try {
        const startTime = Date.now();
        // console.log(startTime)
        const response = await fetch(`${BASE_URL}${url}`, options);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // If the response is not empty, parse JSON
        if (response.status !== 204) {
            const data = await response.json();
            return data;
        }
        console.log(response.statusText);
        return null; // No content to return
    } catch (error) {
        console.error("API request failed", error);
        throw error;
    }
};

// Function to send login request
export const loginHttp = async (username: string, password: string) => {
    const response = await request("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Here a username should be directly passed into body [was: {username}]
        body: JSON.stringify({
            username: username,
            password: password }),
    });

    console.log(response);
    return response;
};
