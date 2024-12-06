// URLs for different handlers

const BASE_URL_TRANSFERS = "";

// Helper function to handle requests
// url: specific url to send request to 
// baseUrl: the base url for the API 
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
// type: deposit or withdraw 
export const transferHttp = async (type: string, amount: number, token: string) => {

    const endpoint = type === "deposit" ? "/portfolios/deposit" : "/portfolios/withdraw";

    const response = await request(endpoint, BASE_URL_TRANSFERS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: amount }),
    });

    console.log(response);
    return response;
};
