const BASE_URL =
  "https://executedordershandler-544401150213.us-central1.run.app";
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
export const getExecutedOrdersHTTP = async (token: string) => {
  const response = await request("/executedOrders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};
