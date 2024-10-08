const BASE_URL = "https://us-central1-comp413fe.cloudfunctions.net/Sample";
// Helper function to handle requests
const request = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);
        console.log(response);

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
export const buyHttp = async () => {
    const response = await request("/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Body yet to be modified
        body: JSON.stringify({

        }),
    });
    console.log(response);
    return response;
};
