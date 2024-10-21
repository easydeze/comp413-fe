// URLs for different handlers
const BASE_URL_BAL = "https://balancehandler-544401150213.us-central1.run.app";
const BASE_URL_MOV = "https://movementshandler-544401150213.us-central1.run.app";

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
export const homeBalanceHttp = async (token: string) => {
    const response = await request("/balance", BASE_URL_BAL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
    });

    console.log(response);
    return response;
};

// Function to send movements request
export const homeMovementsHttp = async (token: string) => {
    const response = await request("/movements", BASE_URL_MOV, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
    });

    console.log(response);
    return response;
};
