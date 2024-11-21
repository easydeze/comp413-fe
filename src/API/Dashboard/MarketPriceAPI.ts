export interface StockMarketPrice {
    tickerSymbol : string;
    marketPrice : number;
}

const token = "Mocktoken"

//API URL for buy and sell
//Todo: add handler for buy and seperate one for sell
const BASE_URL = "https://getmarketprice-544401150213.us-central1.run.app"


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


//Function to get market Price of a stock
export const getMarketPriceHttp = async (ticker: string) => {
    const response : Promise<any> = await request(`/getMarketPrice?tickersymbol=${ticker}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : token,
        }
        
    }).catch((error: Error) => {
        console.error("GetMarketPrice ERROR: ", error.message);
        
    });
    console.log(response);
    return response;
};