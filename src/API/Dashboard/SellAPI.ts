import { Order } from "./BuySellAPI"


const token = "Mocktoken"

//API URL for buy and sell
//Todo: add handler for buy and seperate one for sell
const BASE_URL = "https://sellorderhandler-544401150213.us-central1.run.app";


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
export const sellHttp = async (sellOrder: Order) => {
    const response: Promise<any> = await request(`/sell`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': token,
        },

        body: JSON.stringify({
            tickerSymbol: sellOrder.tickerSymbol,
            limitPrice: sellOrder.limitPrice,
            quantitiy: sellOrder.quantity,
            timestamp: sellOrder.timestamp,
        }),
    }).catch((error: Error) => {
        console.error("SELL ERROR: ", error.message);
        throw error;
    });


    console.log(response);
    return response;
};
