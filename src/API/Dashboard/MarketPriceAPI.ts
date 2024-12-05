// src/API/Dashboard/MarketPriceAPI.ts

export interface StockMarketPrice {
  tickerSymbol: string;
  marketPrice: number;
}

// Add new interface for stocks
export interface Stock {
  symbol: string;
  name: string;
}

const token = "Mocktoken";

//API URL for buy and sell
const BASE_URL = "https://getmarketprice-544401150213.us-central1.run.app";

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
  const response: Promise<any> = await request(
    `/getMarketPrice?tickersymbol=${ticker}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  ).catch((error: Error) => {
    console.error("GetMarketPrice ERROR: ", error.message);
  });
  console.log(response);
  return response;
};

// Add dummy data for available stocks
const DUMMY_STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "WMT", name: "Walmart Inc." },
  { symbol: "DIS", name: "The Walt Disney Company" },
];

// Add function that returns dummy data
export const getAvailableStocksHttp = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return DUMMY_STOCKS;
};
