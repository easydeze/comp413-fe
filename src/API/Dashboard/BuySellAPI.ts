export interface Order {
    tickerSymbol: string;
    quantity: number;
    limitPrice: number;
    timestamp: string;

}

export interface StockMarketPrice {
    tickerSymbol : string;
    marketPrice : number;
}

const token = "Mocktoken"

//API URL for buy and sell
const BASE_URL = "https://buysellorderhandler-544401150213.us-central1.run.app";


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

// Function to make a buy Order request
export const buyHttp = async (buyOrder : Order) => {
    const response : Promise<any> = await request(`/buyOrderEntry`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            buyOrder
        ),
    }).catch((error: Error) => {
        console.error(error.message);
    });
    console.log(response);
    return response;
};


// Function to make a buy Order request
export const sellHttp = async (sellOrder : Order) => {
    const response = await request(`/sellOrderEntry`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            sellOrder
        ),
    }).catch((error: Error) => {
        console.error(error.message);
    });
    console.log(response);
    return response;
};
