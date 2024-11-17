// This should be the url of backend or api gateway

// Now the url not the sample cloud run function but the specific handler for login specifically!
const BASE_URL = "https://stockshandler-544401150213.us-central1.run.app";
// Helper function to handle requests
const request = async (url: string, baseUrl: string, options: RequestInit) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, options);
            console.log(response);
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
export const stockHTTP = async (token: string) => {
    const response = await request("/stocks", BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    console.log(response);
    return response;
};
