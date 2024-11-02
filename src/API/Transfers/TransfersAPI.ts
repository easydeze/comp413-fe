// URLs for different handlers

const BASE_URL_TRANSFERS = "";

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

// Function to send balance request
export const transferHttp = async (type: string, amount: number, token: string) => {
    const response = await request("/transfer", BASE_URL_TRANSFERS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: type, amount: amount, token: token }),
    });

    console.log(response);
    return response;
};
