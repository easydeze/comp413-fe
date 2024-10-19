// This should be the url of backend or api gateway

// Now the url not the sample cloud run function but the specific handler for login specifically!
const BASE_URL = ""
;
// Helper function to handle requests
const request = async (url: string, options: RequestInit) => {
    try {
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

// Function to send balance request
export const homeBalanceHttp = async (token: string) => {
    const response = await request("/balance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token}),
    });

    console.log(response);
    return response;
};

// Function to send movements request
export const homeMovementsHttp = async (token: string) => {
        const response = await request("/movements", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token}),
        });
    
        console.log(response);
        return response;
};
