import { typedFetch } from "./model";

const url = "";

//Should display the stock, ticker + company, 
export function makeOrder() {
    //Search bar on top

    //Should have holdings (account amount, day earnings, and day earning %)

    //Graph (Not included in MVP)

    //List of holdings (number of holdings)
    console.log("Making order");

}

export function getMarketPrice(ticker: String): Promise<number | void> {
    //fetch the stock MarketPrice
    const marketPricePath = "";
    const options: RequestInit = {
        method: `GET`,
        headers: {
            accept: `application/json`,
            "Content-Type": `application/json`,
        },
    };

    const marketPrice = typedFetch<number>(marketPricePath, options)
    .then((marketPrice : number) => {
        return marketPrice;
    }).catch((error) => {
        console.error(error.message);
    })

    return marketPrice;
}




